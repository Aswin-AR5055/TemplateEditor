from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
from django.core.files.storage import default_storage
import uuid

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

        if request.FILES.get('background_image'):
            background_image = request.FILES['background_image']
            fs = FileSystemStorage()
            filename = fs.save(background_image.name, background_image)
            context['background_image_url'] = fs.url(filename)
        else:
            context['background_image_url'] = '/static/editor/image/55123.jpg'

        return render(request, 'editor/template_preview.html', context)

    return render(request, 'editor/form.html')

def upload_invitation(request):
    if request.method == "POST" and request.FILES.get("image"):
        file = request.FILES["image"]
        filename = f"invitations/{uuid.uuid4()}.png"
        saved_path = default_storage.save(filename, file)
        relative_url = default_storage.url(saved_path)

        full_url = request.build_absolute_uri(relative_url)

        return JsonResponse({"url": full_url})
    return JsonResponse({"error": "Invalid request"}, status=400)



