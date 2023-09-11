"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import hashlib
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product,Seller, Imageset
from werkzeug.utils import secure_filename 
from datetime import datetime, timedelta, timezone
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import unset_jwt_cookies, create_access_token, get_jwt_identity, set_access_cookies, jwt_required
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
load_dotenv()
import json
import cloudinary
from cloudinary.uploader import upload, destroy
import cloudinary.api
import pathlib
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

api = Blueprint('api', __name__)
CORS(api, supports_credentials=True)
app = Flask(__name__)
bcrypt = Bcrypt(app)
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

cloudinary.config(secure = True)

# def uploadImage():
#     form=ImageForm()
#     if form.validate_on_submit():
#         image_file = form.image_file.data
#         if image_file.filename == "":
#             print("No selected file!", "error")
#         if image_file and allowed_file(image_file.filename):
#             upload_result = upload(
#                 image_file,
#                 resource_type="image",
#                 folder="green_garb",
#             )
#             return upload_result
#         else:
#             print("File type not allowed!", "error")


# @api.route("/upload", methods=["GET", "POST"])
# def upload():
#     form=ImageForm()
#     if form.validate_on_submit():
#         image_file = form.image_file.data
#         if image_file.filename == "":
#             print("No selected file!", "error")
#         if image_file and allowed_file(image_file.filename):
#             upload_result = upload(
#                 image_file,
#                 resource_type="image",
#                 folder="green_garb",
#             )
#             secure_url = upload_result["secure_url"]
#             public_id = upload_result["public_id"]
            




@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    email = request.json["email"]
    username = request.json["username"]
    password = request.json["password"]
    name=request.json["name"]

    email_exists = User.query.filter_by(email=email).first() is not None
    if email_exists:
        return jsonify({"error": "Email already exists"}), 409
    
    user_exists = User.query.filter_by(username=username).first() is not None
    if user_exists:
        return jsonify({"error": "Username already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    new_user = User(
        email=email,
        username=username,
        password=hashed_password,
        name=name
    )
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "User created successfully"}), 200
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"error": "Error creating user"}), 400
    
@api.route('/login', methods=["POST", "GET"])
def login():
    try:
        username = request.json["username"]
        password = request.json["password"]

        user = User.query.filter_by(username=username).first()
        if not user or not bcrypt.check_password_hash(user.password, password):
            return jsonify({"error": "Invalid email or password"}), 401

        access_token = create_access_token(identity=user.id)
        return jsonify(
            access_token=access_token,
            username=user.username, 
            id=user.id  
        ), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
    
@api.route('/user', methods=['GET'])
@cross_origin()
@jwt_required()
def get_user(): 
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify(user.serialize())


@api.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    resp = jsonify({"msg": "Logout successful"})
    unset_jwt_cookies(resp)
    return resp, 200


@api.route('/sellers', methods=['POST',"GET"])
@jwt_required()
@cross_origin()
def create_seller():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if user.seller:
        return jsonify({"error": "User is already a seller"}), 400
    try:
        data = request.form
        shop_name = data["shop_name"]
        description = data["description"]
        email = data["email"]
        
        # address = data["address"]
        
        if "img" in request.files:
            img=request.files["img"]
            upload_result = upload(
                img,
                resource_type="image",
                folder="green_garb",
            )
            public_id = upload_result["public_id"]
        else:
            public_id = None

        new_seller = Seller(
            user=user,
            shop_name=shop_name,
            description=description,
            email=email,
            # address=address,
            img=public_id,
        )

        db.session.add(new_seller)
        db.session.commit()

        return jsonify({"message": "Seller created successfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
    
@api.route('/sellers/<int:seller_id>', methods=['DELETE'])
@jwt_required()
def delete_seller(seller_id):
    seller = Seller.query.get(seller_id)
    if not seller:
        return jsonify({"error": "Seller not found"}), 404
    
    # Delete associated products and imagesets
    for product in seller.products:
        Imageset.query.filter_by(product_id=product.id).delete()
        db.session.delete(product)
    
    db.session.delete(seller)
    db.session.commit()

    return jsonify({"message": "Seller and associated products deleted successfully"}), 200


@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user = get_jwt_identity()
    return jsonify({"message": f"Hello, {current_user}!"}), 200

@api.route('/products', methods=['POST'])
@jwt_required()
@cross_origin()
def create_product():
    try:
        current_user_id = get_jwt_identity()
        seller = Seller.query.filter_by(user_id=current_user_id).first()

        if not seller:
            return jsonify({"error": "User is not a seller"}), 400
        
        data = request.form
        title = data["title"]
        description = data["description"]
        price = data["price"]
        category = data["category"]
        sub_category= data["sub_category"]
        material= data["material"]
        quantity = data["quantity"]
        condition = data["condition"]
        color = data["color"]
        size = data["size"]
    
        new_product = Product(
            title=title,
            description=description,
            price=price,
            category=category,
            sub_category=sub_category,
            material=material,
            quantity=quantity,
            condition=condition,
            color=color,
            size=size,
            seller_id=seller.id,
            status=True  # Set the initial status
        )
        db.session.add(new_product)
        db.session.commit()
        images = request.files.getlist("file")
        image_public_ids = []
        for image in images:
            if image:
                upload_result = upload(image, folder="green_garb")
                image_public_ids.append(upload_result['public_id'])
                new_imageset = Imageset(image=image_public_ids[-1], product=new_product)
                db.session.add(new_imageset)
                db.session.commit()

        return jsonify(new_product.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
    
@api.route('/users/profile', methods=['PUT','POST','GET'])
@jwt_required()
@cross_origin()
def update_profile():
    
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        data = request.form
        user.name = data.get("name", user.name)
        user.email = data.get("email", user.email)
        user.address = data.get("address", user.address)
        print(request.files)
        if 'profile_image' in request.files:
            if user.pictures:
                destroy(user.pictures)
            result = upload(request.files['profile_image'], folder="green_garb")
            user.pictures=result['public_id']
       
        
        new_password = data.get("new_password")
        if new_password:
            hashed_password = bcrypt.generate_password_hash(new_password).decode("utf-8")
            user.password = hashed_password
        db.session.add(user)
        db.session.commit()

        return  jsonify('all good'), 200
    

@api.route('/products/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    try:
        data = request.form
        product.title = data.get("title", product.title)
        product.description = data.get("description", product.description)
        product.price = data.get("price", product.price)
        product.category = data.get("category", product.category)
        product.sub_catergory = data.get("sub_catergory", product.sub_catergory)
        product.material = data.get("material", product.material)
        product.quantity = data.get("quantity", product.quantity)
        product.condition = data.get("condition", product.condition)
        product.color = data.get("color", product.color)
        product.size = data.get("size", product.size)

        # Handle image updates and removals
        images_to_upload = request.files.getlist('images')
        existing_imageset_ids = data.get('existing_imageset_ids', [])  # List of Imageset IDs to keep
        
        for imageset in product.imagesets:
            if imageset.id in existing_imageset_ids:
                # Update existing imageset (if necessary)
                imageset.image = data.get(f'existing_image_{imageset.id}', imageset.image)
            else:
                # Delete imageset if not in existing_imageset_ids
                destroy(imageset.image)
                db.session.delete(imageset)
        
        for image in images_to_upload:
            if image:
                upload_result = upload(image,folder="green_garb")
                cloudinary_image_url = upload_result['public_id']
                new_imageset = Imageset(image=cloudinary_image_url, product=product)
                db.session.add(new_imageset)
        
        db.session.commit()

        return jsonify({"message": "Product updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@api.route('/products/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    Imageset.query.filter_by(product_id=product_id).delete()

    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "Product deleted successfully"}), 200

@api.route('/products', methods=['GET'])
def get_all_products():
    products = Product.query.all()
    serialized_products = []

    for product in products:
        serialized_product = product.serialize()

        # Include imageset data for the product
        imagesets = Imageset.query.filter_by(product_id=product.id).all()
        serialized_imagesets = [imageset.serialize() for imageset in imagesets]
        serialized_product['imagesets'] = serialized_imagesets

        serialized_products.append(serialized_product)

    return jsonify(serialized_products), 200

@api.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    serialized_product = product.serialize()
    
    # Fetch associated imagesets for the product
    imagesets = Imageset.query.filter_by(product_id=product_id).all()
    serialized_imagesets = [imageset.serialize() for imageset in imagesets]
    serialized_product['imageset'] = serialized_imagesets
    
    return jsonify(serialized_product), 200
@api.route('/seller/shop', methods=['GET','POST'])
@cross_origin()
@jwt_required()
def get_seller_shop():
     try:
        current_user_id = get_jwt_identity()
        seller = Seller.query.filter_by(user_id=current_user_id).first()
        if seller:
            return jsonify(seller.serialize()), 200
        else:
            return jsonify({'error': 'Seller not found'}), 404
     except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
        
    
    