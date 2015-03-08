from .extensions import db, bcrypt
from marshmallow import Schema, fields, ValidationError
from flask.ext.login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    encrypted_password = db.Column(db.String(60))

    def get_password(self):
        return getattr(self, "_password", None)

    def set_password(self, password):
        self._password = password
        self.encrypted_password = bcrypt.generate_password_hash(password)

    password = property(get_password, set_password)

    def check_password(self, password):
        return bcrypt.check_password_hash(self.encrypted_password, password)

    def __repr__(self):
        return "<User {}>".format(self.email)

    def to_dict(self):
        resp = {"name": self.name,
                "email": self.email}
        return resp


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    completion_status = db.Column(db.Boolean, default=False)
    started_status = db.Column(db.Boolean, default=False)
    due_date = db.Column(db.DateTime)
    owner = db.Column(db.Integer)
    assignee = db.Column(db.Integer)
    description = db.Column(db.String(255))
    status = db.Column(db.String(255), default="TODO")

    def to_dict(self):
        resp = {"id": self.id,
                "title": self.title,
                "completion_status": self.completion_status,
                "started_status": self.started_status,
                "due_date": self.due_date,
                "owner": self.owner,
                "assignee": self.assignee,
                "description": self.description,
                "status": self.status}
        return resp

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
        fields = ("id", "title", "description", "status", "owner", "assignee", "due_date")


class UserSchema(Schema):
    name = fields.String()
    email = fields.Email()
    class Meta:
        fields = ("id", "name", "email")





