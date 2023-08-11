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
    email = Column(String(250), nullable=False)
    user_name = Column(String(250), nullable=False)
    password = Column(String(250), nullable=False)
    address = Column(String(500), nullable=False)
    shop_name = Column(String(50), nullable=True)
    # reviews = Column(S)
    # transactions = Column()


class Favorites(Base):
    __tablename__= 'Favorites'
    user_id = Column(Integer, ForeignKey('User.id'))
    favorites = relationship(User)


class Products(Base):
    __tablename__= 'Products'
    id = Column(Integer, primary_key=True)
    product_name = Column(String(200), nullable=False)
     




class Address(Base):
    __tablename__ = 'address'
    # Here we define columns for the table address.
    # Notice that each column is also a normal Python instance attribute.
    id = Column(Integer, primary_key=True)
    street_name = Column(String(250))
    street_number = Column(String(250))
    post_code = Column(String(250), nullable=False)
    person_id = Column(Integer, ForeignKey('person.id'))
    person = relationship(Person)

    def to_dict(self):
        return {}

## Draw from SQLAlchemy base
render_er(Base, 'diagram.png')