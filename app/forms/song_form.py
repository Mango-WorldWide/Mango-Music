from flask_wtf import FlaskForm
from wtforms import StringField , IntegerField, SubmitField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.aws_helpers import ALLOWED_EXTENSIONS

#PROBABLY NEEDS TO BE ALTERED TO IMPEMENT NEW SONG
class SongForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    mp3 = FileField('MP3 File', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Add Song")