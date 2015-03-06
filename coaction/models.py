from .extensions import db, bcrypt
from marshmallow import Schema, fields, ValidationError
from flask.ext.login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    encrypted_password = db.Column(db.String(60))


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    completion_status = db.Column(db.Boolean, default=False)
    started_status = db.Column(db.Boolean, default=False)
    due_date = db.Column(db.DateTime)
    owner = db.Column(db.Integer)
    assignee = db.Column(db.Integer)


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    text = db.Column(db.String(255), nullable=False)
    user = db.Column(db.Integer)
    task_id = db.Column(db.Integer)


def must_not_be_blank(data):
    if not data:
        raise ValidationError('Data not provided.')

class TaskSchema(Schema):
    title = fields.Str(required=True, validate=must_not_be_blank)

    class Meta:
        fields = ("id", "title")


