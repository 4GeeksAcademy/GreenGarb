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
from flask_jwt_extended import jwt_required
from flask_cors import CORS
from flask_bcrypt import Bcrypt

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
    
@api.route('/login', methods=['POST'])
def login():
    username = request.json["username"]
    password = request.json["password"]

    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.username)
        return jsonify({"access_token": access_token}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

@api.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    resp = jsonify({"msg": "Logout successful"})
    unset_jwt_cookies(resp)
    return resp, 200
@api.route('/sellers', methods=['POST'])
@jwt_required()
def create_seller():
    current_user = get_jwt_identity()  # Get the current user from JWT
    user_id = current_user.get('id')  # Assuming you have the 'id' field in the JWT payload

    data = request.json
    shopName = data.get('shopName')
    description = data.get('description')
    email = data.get('email')
    address = data.get('address')
    img = data.get('img')

    new_seller = Seller(
        user_id=user_id,
        shopName=shopName,
        description=description,
        email=email,
        address=address,
        img=img
    )

    try:
        db.session.add(new_seller)
        db.session.commit()
        return jsonify({"message": "Seller created successfully"}), 201
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"error": "Error creating seller"}), 400
@api.route('/sellers/<int:seller_id>', methods=['PUT'])
@jwt_required()
def update_seller(seller_id):
    seller = Seller.query.get(seller_id)
    if not seller:
        return jsonify({"error": "Seller not found"}), 404
    
    data = request.json

    shopName = data.get('shopName')
    email = data.get('email')

    seller.shopName = shopName
    seller.email = email

    db.session.commit()

    return jsonify({"message": "Seller updated successfully"}), 200

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
    # Assuming you receive the product data in the request JSON
    data = request.json
    imageset_data = data.pop('imageset', [])

    new_product = Product(**data)
    db.session.add(new_product)
    db.session.commit()
    for imageset in imageset_data:
        new_imageset = Imageset(**imageset, product=new_product)
        db.session.add(new_imageset)

    db.session.commit()
    return jsonify({"message": "Product created successfully"}), 201

@api.route('/products/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    # Update the product attributes based on the request JSON
    data = request.json
    for key, value in data.items():
        setattr(product, key, value)
    
    imageset_data = data.get('imageset', [])
    for imageset in imageset_data:
        imageset_id = imageset.get('id')
        if imageset_id:
            existing_imageset = Imageset.query.get(imageset_id)
            if existing_imageset:
                for key, value in imageset.items():
                    setattr(existing_imageset, key, value)

    db.session.commit()
    return jsonify({"message": "Product updated successfully"}), 200
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