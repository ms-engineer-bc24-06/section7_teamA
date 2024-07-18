"""Update models.py

Revision ID: 0fc8c9651342
Revises: 55e05f892a89
Create Date: 2024-07-18 02:07:42.732725

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = '0fc8c9651342'
down_revision: Union[str, None] = '55e05f892a89'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('season', sa.String(length=5), nullable=True),
    sa.Column('title', sa.String(length=100), nullable=True),
    sa.Column('description', sa.String(length=500), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_favorites_id'), 'favorites', ['id'], unique=False)
    op.create_index(op.f('ix_favorites_season'), 'favorites', ['season'], unique=False)
    op.create_index(op.f('ix_favorites_title'), 'favorites', ['title'], unique=False)
    op.create_index(op.f('ix_favorites_user_id'), 'favorites', ['user_id'], unique=False)
    op.drop_index('ix_favorite_id', table_name='favorite')
    op.drop_index('ix_favorite_season', table_name='favorite')
    op.drop_index('ix_favorite_title', table_name='favorite')
    op.drop_table('favorite')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('favorite',
    sa.Column('id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('season', mysql.VARCHAR(length=5), nullable=True),
    sa.Column('title', mysql.VARCHAR(length=100), nullable=True),
    sa.Column('description', mysql.VARCHAR(length=500), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_index('ix_favorite_title', 'favorite', ['title'], unique=False)
    op.create_index('ix_favorite_season', 'favorite', ['season'], unique=False)
    op.create_index('ix_favorite_id', 'favorite', ['id'], unique=False)
    op.drop_index(op.f('ix_favorites_user_id'), table_name='favorites')
    op.drop_index(op.f('ix_favorites_title'), table_name='favorites')
    op.drop_index(op.f('ix_favorites_season'), table_name='favorites')
    op.drop_index(op.f('ix_favorites_id'), table_name='favorites')
    op.drop_table('favorites')
    # ### end Alembic commands ###