from django.shortcuts import render
from django.core.files.storage import FileSystemStorage

def template_editor(request):
    context = {}

    if request.method == 'POST':
        context['college'] = 'Saiva Bhanu Kshatriya College'
        context['location'] = 'Aruppukottai'
        context['heading'] = request.POST.get('heading')
        context['message'] = request.POST.get('message')
        context['date'] = request.POST.get('date')
        context['time'] = request.POST.get('time')
        context['venue'] = request.POST.get('venue')

        if request.FILES.get('image'):
            image = request.FILES['image']
            fs = FileSystemStorage()
            filename = fs.save(image.name, image)
            context['image_url'] = fs.url(filename)

        # Background image (check uploaded, else fallback)
        if request.FILES.get('background_image'):
            background_image = request.FILES['background_image']
            fs = FileSystemStorage()
            filename = fs.save(background_image.name, background_image)
            context['background_image_url'] = fs.url(filename)
        else:
            # default background (from static folder)
            context['background_image_url'] = '/static/editor/image/55123.jpg'

        return render(request, 'editor/template_preview.html', context)

    return render(request, 'editor/form.html')



