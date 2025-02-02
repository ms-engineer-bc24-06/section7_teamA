"""empty message

Revision ID: 44f5c8524ccc
Revises: 8fad0c5f2b7f
Create Date: 2024-07-18 04:01:52.374990

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = '44f5c8524ccc'
down_revision: Union[str, None] = '8fad0c5f2b7f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('favorites', 'user_id',
               existing_type=mysql.INTEGER(),
               type_=sa.String(length=50),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('favorites', 'user_id',
               existing_type=sa.String(length=50),
               type_=mysql.INTEGER(),
               existing_nullable=True)
    # ### end Alembic commands ###
