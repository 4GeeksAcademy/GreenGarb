from flask_sqlalchemy import SQLAlchemy
import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy import create_engine
from eralchemy2 import render_er

db = SQLAlchemy()


class User(db.model):
    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(250), nullable=False, unique=True)
    user_name = db.Column(db.String(250), nullable=False, unique=True)
    password = db.Column(db.String(250), nullable=False, unique=False)
    address = db.Column(db.String(500), nullable=False)
    shop_name = db.Column(db.String(50), nullable=True)
    # reviews = db.Column(S)
    # transactions = db.Column()


# class Favorites(db.model):
#     __tablename__= 'Favorites'
#     user_id = Column(Integer, ForeignKey('User.id'))
#     favorites = relationship(User)


class Products(db.model):
    __tablename__= 'Products'
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(250), nullable=False)
    image = db.Column(db.String(500), nullable=False)
    condition = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    color = db.Column (db.String(50), nullable=True)
    size = db.Column(db.String(50), nullable=False)
    seller_id = db.Column(db.Integer, ForeignKey('User.id'))
    status = db.db.Column(db.Boolean(), unique=False, nullable=False)
    date_created = db.Column(db.Integer, nullable=False)
    date_expired = db.Column(db.Integer, nullable=False)


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }


render_er(db.model, 'diagram.png')