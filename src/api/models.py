from flask_sqlalchemy import SQLAlchemy
import os
import sys
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, JSON
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    name = db.Column(db.String(250))
    reviews = db.Column(db.Text)
    address = db.Column(db.String(120))
    pictures = db.Column(db.String(255))
    transactions = db.Column(db.String(255))
    favorites = db.Column(db.Boolean())
    seller = db.relationship('Seller', back_populates='user')
    def __init__(self, username,email, password):
        self.email=email
        self.username = username
        self.password = password
       
    def __repr__(self):
        return f'<User {self.username}>'
    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "name": self.name,
            "email": self.email,
            "address": self.address,
        }
    
class Seller(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id= db.Column(db.Integer, ForeignKey('user.id'))
    user = db.relationship("User", back_populates="seller")
    shop_name = db.Column(db.String(250), nullable=False)
    description = db.Column(db.Text, nullable=False)
    email = db.Column(db.String(120), nullable=False)
    img = db.Column(db.String(255))
    address = db.Column(db.String(120))
    products = db.relationship('Product', back_populates='seller', lazy=True)
    
    
    def __repr__(self):
        return f'<Seller {self.shop_name}>'
    
    def serialize(self):
       return {
            'id': self.id,
            'user_id': self.user_id,
            'shop_name': self.shop_name,
            'description': self.description,
            'email': self.email,
            'img': self.img,
            'address': self.address,
            'products': [product.serialize() for product in self.products]
        }
    
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)  # Store the category name as a string
    quantity = db.Column(db.Integer, nullable=False)
    condition = db.Column(db.String(50), nullable=False)
    color = db.Column(db.String(50))
    size = db.Column(db.String(50))
    imageset = db.relationship('Imageset', back_populates='product', lazy=True, uselist=True)
    seller_id = db.Column(db.Integer, ForeignKey('seller.id'), nullable=False)
    seller = db.relationship('Seller', back_populates='products')
    buyer_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=True)
    status = db.Column(db.Boolean(), nullable=False)
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "price": self.price,
            "category": self.category,
            "quantity": self.quantity,
            "condition": self.condition,
            "color": self.color,
            "size": self.size,
            "imageset": [image.serialize() for image in self.imageset],
            "seller_id": self.seller_id,
            "buyer_id": self.buyer_id,
            "status": self.status
        }
    
class Imageset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(120), nullable=False)
    product_id = db.Column(db.Integer, ForeignKey('product.id'), nullable=False)
    product = db.relationship("Product", back_populates="imageset")
    def serialize(self):
        return {
            'id': self.id,
            'image': self.image,
            'product_id': self.product_id
        }
