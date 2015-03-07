"""empty message

Revision ID: 332fa851edc
Revises: f9ebf29f63
Create Date: 2015-03-07 15:05:24.363837

"""

# revision identifiers, used by Alembic.
revision = '332fa851edc'
down_revision = 'f9ebf29f63'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('task', sa.Column('status', sa.String(length=255), nullable=True))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('task', 'status')
    ### end Alembic commands ###
