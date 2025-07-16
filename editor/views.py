from django.shortcuts import render

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
        return render(request, 'editor/template_preview.html', context)

    return render(request, 'editor/form.html')
