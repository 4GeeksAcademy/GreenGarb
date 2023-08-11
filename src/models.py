import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy import create_engine
from eralchemy2 import render_er

Base = declarative_base()

class User(Base):
    __tablename__ = 'User'
    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    email = Column(String(250), nullable=False, unique=True)
    user_name = Column(String(250), nullable=False, unique=True)
    password = Column(String(250), nullable=False, unique=False)
    address = Column(String(500), nullable=False)
    shop_name = Column(String(50), nullable=True)
    # reviews = Column(S)
    # transactions = Column()


# class Favorites(Base):
#     __tablename__= 'Favorites'
#     user_id = Column(Integer, ForeignKey('User.id'))
#     favorites = relationship(User)


class Products(Base):
    __tablename__= 'Products'
    id = Column(Integer, primary_key=True)
    product_name = Column(String(200), nullable=False)
    price = Column(Integer, nullable=False)
    description = Column(String(250), nullable=False)
    image = Column(String(500), nullable=False)
    condition = Column(String(50), nullable=False)
    quantity = Column(Integer, nullable=False)
    color = Column (String(50), nullable=True)
    size = Column(String(50), nullable=False)
    seller_id = Column(Integer, ForeignKey('User.id'))
    status = db.Column(db.Boolean(), unique=False, nullable=False)
    date_created = Column(Integer, nullable=False)
    date_expired = Column(Integer, nullable=False)



    def to_dict(self):
        return {}

## Draw from SQLAlchemy base
render_er(Base, 'diagram.png')