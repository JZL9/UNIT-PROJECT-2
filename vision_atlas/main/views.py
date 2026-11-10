import json
from pathlib import Path

from django.http import Http404
from django.shortcuts import render
from django.shortcuts import render, redirect
from django.utils.http import url_has_allowed_host_and_scheme


# Create your views here.

DATA_FILE = Path(__file__).resolve().parent / 'data' / 'projects.json'

with open(DATA_FILE, encoding='utf-8') as f:
    PROJECTS = json.load(f)

def localize(project, lang):
    if lang != 'ar' or 'ar' not in project:
        return project

    result = dict(project)
    for key, value in project['ar'].items():
        original = project.get(key)
        if isinstance(value, list) and isinstance(original, list) and value and isinstance(value[0], dict):
            result[key] = [{**orig, **tr} for orig, tr in zip(original, value)]
        else:
            result[key] = value
    return result

def home(request):
    lang = request.COOKIES.get('lang', 'en')
    projects = {slug: localize(p, lang) for slug, p in PROJECTS.items()}
    return render(request, 'main/home.html', {'projects': projects})


def project_detail(request, slug):
    project = PROJECTS.get(slug)
    if project is None:
        raise Http404("Project not found")

    slugs = list(PROJECTS)
    index = slugs.index(slug)
    next_slug = slugs[index + 1] if index + 1 < len(slugs) else None

    lang = request.COOKIES.get('lang', 'en')

    return render(request, f'main/projects/{slug}.html', {
        'project': localize(project, lang),
        'next_slug': next_slug,
        'next_project': localize(PROJECTS[next_slug], lang) if next_slug else None,
    })

def set_theme(request):
    theme = request.GET.get('theme', 'light')
    if theme not in ('light', 'dark'):
        theme = 'light'

    next_url = request.GET.get('next', '/')
    if not url_has_allowed_host_and_scheme(next_url, allowed_hosts={request.get_host()}):
        next_url = '/'

    response = redirect(next_url)
    response.set_cookie('theme', theme, max_age=60 * 60 * 24 * 365)
    return response

def about(request):
    return render(request, 'main/about.html')

def set_language(request):
    lang = request.GET.get('lang', 'en')
    if lang not in ('en', 'ar'):
        lang = 'en'

    next_url = request.GET.get('next', '/')
    if not url_has_allowed_host_and_scheme(next_url, allowed_hosts={request.get_host()}):
        next_url = '/'

    response = redirect(next_url)
    response.set_cookie('lang', lang, max_age=60 * 60 * 24 * 365)
    return response