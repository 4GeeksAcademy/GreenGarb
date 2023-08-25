"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import hashlib
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product,Seller, Imageset
from datetime import datetime, timedelta, timezone
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import unset_jwt_cookies
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import set_access_cookies
from flask_jwt_extended import jwt_required
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import cloudinary
import cloudinary.uploader
import cloudinary.api


cloudinary.config( 
  cloud_name = os.getenv('CLOUD_NAME'),
  api_key = os.getenv('CLOUDINARY_API_KEY'),
  api_secret = os.getenv('CLOUDINARY_API_SECRET'),
  secure = True
)

api = Blueprint('api', __name__)
CORS(api, supports_credentials=True)
app = Flask(__name__)
bcrypt = Bcrypt(app)




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
        access_token = create_access_token(identity=username)
        return jsonify({"access_token": access_token}), 200
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
        response = jsonify({"access_token": access_token})
        set_access_cookies(response, access_token)
        return response, 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@api.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    resp = jsonify({"msg": "Logout successful"})
    unset_jwt_cookies(resp)
    return resp, 200
@api.route('/sellers', methods=['POST'])
@jwt_required()
def create_seller():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if user.seller:
        return jsonify({"error": "User is already a seller"}), 400
    try:
        data = request.json
        shop_name = data["shop_name"]
        description = data["description"]
        email = data["email"]
        address = data["address"]

        new_seller = Seller(
            user=user,
            shop_name=shop_name,
            description=description,
            email=email,
            address=address,
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
def create_product():
    try:
        current_user_id = get_jwt_identity()
        seller = Seller.query.filter_by(user_id=current_user_id).first()

        if not seller:
            return jsonify({"error": "User is not a seller"}), 400
        
        data = request.json
        title = data["title"]
        description = data["description"]
        price = data["price"]
        category = data["category"]
        quantity = data["quantity"]
        condition = data["condition"]
        color = data["color"]
        size = data["size"]
        images = data.get("imageset", [])  # List of image URLs
    
        new_product = Product(
            title=title,
            description=description,
            price=price,
            category=category,
            quantity=quantity,
            condition=condition,
            color=color,
            size=size,
            seller_id=seller.id,
            status=True  # Set the initial status
        )
        db.session.add(new_product)
        db.session.commit()
        for image in images:
            # Upload image to Cloudinary
            image = request.files['file']
            app.logger.info('%s image', image)
            upload_result = cloudinary.uploader.upload(image)
            cloudinary_image_url= upload_result['secure_url']
            new_imageset = Imageset(image=cloudinary_image_url, product=new_product)
            db.session.add(new_imageset)

        db.session.commit()

        return jsonify({"message": "Product added successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
    
@api.route('/users/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        data = request.json
        user.name = data.get("name", user.name)
        user.email = data.get("email", user.email)
        user.address = data.get("address", user.address)
        user.pictures = data.get("pictures", user.pictures)

        # Handle profile image upload to Cloudinary
        profile_image = request.files['file']
        if profile_image:
            if user.pictures:
                cloudinary.uploader.destroy(user.pictures.public_id)  # Delete old image from Cloudinary
            response = cloudinary.uploader.upload(profile_image)
            user.pictures = response['secure_url']
        
        # Update password if provided
        new_password = data.get("new_password")
        if new_password:
            hashed_password = bcrypt.generate_password_hash(new_password).decode("utf-8")
            user.password = hashed_password
        
        db.session.commit()

        return jsonify({"message": "Profile updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@api.route('/products/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    try:
        data = request.json
        product.title = data.get("title", product.title)
        product.description = data.get("description", product.description)
        product.price = data.get("price", product.price)
        product.category = data.get("category", product.category)
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
                db.session.delete(imageset)
        
        for image in images_to_upload:
            if image:
                upload_result = cloudinary.uploader.upload(image)
                cloudinary_image_url = upload_result['secure_url']
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