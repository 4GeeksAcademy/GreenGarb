"""empty message

Revision ID: edc0cd99b33d
Revises: 
Create Date: 2023-09-21 00:41:14.630128

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'edc0cd99b33d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('username', sa.String(length=80), nullable=False),
    sa.Column('name', sa.String(length=250), nullable=True),
    sa.Column('reviews', sa.Text(), nullable=True),
    sa.Column('address', sa.String(length=120), nullable=True),
    sa.Column('pictures', sa.String(length=255), nullable=True),
    sa.Column('transactions', sa.String(length=255), nullable=True),
    sa.Column('favorites', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('seller',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('shop_name', sa.String(length=250), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('img', sa.String(length=255), nullable=True),
    sa.Column('address', sa.String(length=120), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('category', sa.String(length=50), nullable=False),
    sa.Column('sub_category', sa.String(length=50), nullable=True),
    sa.Column('material', sa.String(length=50), nullable=True),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('condition', sa.String(length=50), nullable=False),
    sa.Column('color', sa.String(length=50), nullable=True),
    sa.Column('size', sa.String(length=50), nullable=True),
    sa.Column('seller_id', sa.Integer(), nullable=False),
    sa.Column('buyer_id', sa.Integer(), nullable=True),
    sa.Column('status', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['buyer_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['seller_id'], ['seller.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('imageset',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('image', sa.String(length=120), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['product_id'], ['product.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('imageset')
    op.drop_table('product')
    op.drop_table('seller')
    op.drop_table('user')
    # ### end Alembic commands ###
