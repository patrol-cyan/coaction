from .extensions import db
from marshmallow import Schema, fields, ValidationError

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    status = db.Column

class TaskSchema(Schema):
    title = fields.Str(required=True, validate=must_not_be_blank)

    class Meta:
        fields = ("id", "title")


