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

        # Updated to check for 'background_image'
        if request.FILES.get('background_image'):
            backgroundImage = request.FILES['background_image']
            fs = FileSystemStorage()
            filename = fs.save(backgroundImage.name, backgroundImage)
            context['background_image_url'] = fs.url(filename)

        return render(request, 'editor/template_preview.html', context)

    return render(request, 'editor/form.html')