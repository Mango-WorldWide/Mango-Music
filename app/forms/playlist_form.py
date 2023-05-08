from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import InputRequired

class PlaylistForm(FlaskForm):
    title = StringField("Title", validators = [InputRequired()])
    description = StringField("Description", validators = [InputRequired()]) 
    cover = StringField("Cover", validators = [InputRequired()]) 
     