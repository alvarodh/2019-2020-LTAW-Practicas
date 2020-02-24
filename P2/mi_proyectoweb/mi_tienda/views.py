# -- Fichero mi_tienda/views.py
from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
from django.shortcuts import render
from random import randint

def index(request):
    return render(request, 'index.html', {'numero1': str(randint(0, 100)), 'numero2': str(randint(0, 100))})

def producto1(request):
    return render(request, 'producto1.html')

def producto2(request):
    return render(request, 'producto2.html')

def producto3(request):
    return render(request, 'producto3.html')
