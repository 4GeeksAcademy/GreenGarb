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
    username = db.Column(db.String(80), unique=True)
    name = db.Column(db.String(250), nullable=False)
    shopname = db.Column(db.String(120))
    reviews = db.Column(db.String(255))
    address = db.Column(db.String(120))
    pictures = db.Column(db.String(255))
    transactions = db.Column(db.String(255))
    favorites = db.Column(db.Boolean())
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
    img = db.Column(db.String(255))
    seller_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    buyer_id = db.Column(db.Integer, ForeignKey('user.id'))
    status = db.Column(db.String(50), nullable=False)
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
            "img": self.img,
            "seller_id": self.seller_id,
            "buyer_id": self.buyer_id,
            "status": self.status,
            # Add other attributes you want to serialize here

        }