from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class AlbumForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description')
    cover = StringField('cover', validators=[DataRequired()])
    genre = StringField('genre', validators=[DataRequired()])
    year = StringField('year', validators=[DataRequired()])
    artist_id = IntegerField('artist_id',validators=[DataRequired()])
