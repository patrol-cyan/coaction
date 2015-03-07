from flask_wtf import Form

from wtforms import StringField, BooleanField, PasswordField
from wtforms.validators import DataRequired, Email, EqualTo
from wtforms.fields.html5 import EmailField


class APIForm(Form):
    def __init__(self, *args, **kwargs):
        default_kwargs = {"formdata": None, "csrf_enabled": False}
        default_kwargs.update(kwargs)
        super().__init__(*args, **default_kwargs)

class TodoForm(APIForm):
    title = StringField('Title', validators=[DataRequired()])
    completed = BooleanField('Completed', default=False)

class LoginForm(Form):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])


class RegistrationForm(Form):
    name = StringField('Name', validators=[DataRequired()])
    email = EmailField('Email', validators=[DataRequired(), Email()])
    password = PasswordField(
        'Password',
        validators=[DataRequired(),
                    EqualTo('password_verification',
                            message="Passwords must match")])
    password_verification = PasswordField('Repeat password')