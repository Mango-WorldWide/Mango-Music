from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, Length, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email provided not found.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    email = StringField(
        "email",
        validators=[
            DataRequired(),
            Email(message="Please provide a valid email."),
        ],
    )
    password = StringField(
        "password",
        validators=[
            DataRequired(),
            Length(
                min=8,
                max=16,
                message="Password must be between 8 and 16 characters long.",
            ),
        ],
    )