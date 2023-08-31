from flask_wtf import FlaskForm
from wtforms.fields import FileField, StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length


class ImageForm(FlaskForm):
   
    image_file = FileField("image_file")
    submit = SubmitField("Save")