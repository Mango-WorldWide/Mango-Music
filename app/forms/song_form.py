from flask_wtf import FlaskForm
from wtforms import StringField , IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired

#PROBABLY NEEDS TO BE ALTERED TO IMPEMENT NEW SONG
class SongForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    # mp3 = FileField('MP3 File', validators=[FileAllowed(), FileRequired()])
