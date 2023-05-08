from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class AlbumForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    cover = StringField('cover', validators=[DataRequired()])
    genre = StringField('genre', validators=[DataRequired()])
    year = StringField('year', validators=[DataRequired()])
    artist_id = StringField('artist_id',validators=[DataRequired()])
