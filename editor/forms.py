from django import forms

class TemplateUpdateForm(forms.Form):
    heading = forms.CharField(label="Heading", initial="Welcome to the Fresher's Day Orientation!")
    message = forms.CharField(widget=forms.Textarea, label="Message")
    date = forms.CharField(label="Date", initial="27.06.2025")
    time = forms.CharField(label="Time", initial="10am")
    venue = forms.CharField(label="Venue", initial="Auditorium")
    image = forms.ImageField(label="Image", required=False)
