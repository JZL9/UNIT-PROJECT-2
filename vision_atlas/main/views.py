import json
from pathlib import Path

from django.http import Http404
from django.shortcuts import render


# Create your views here.

DATA_FILE = Path(__file__).resolve().parent / 'data' / 'projects.json'

with open(DATA_FILE, encoding='utf-8') as f:
    PROJECTS = json.load(f)


def home(request):
    return render(request, 'main/home.html', {'projects': PROJECTS})


def project_detail(request, slug):
    project = PROJECTS.get(slug)
    if project is None:
        raise Http404("Project not found")
    return render(request, 'main/project_detail.html', {'project': project})