# -- Fichero mi_tienda/views.py
from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
from django.shortcuts import render
from random import randint
from mi_tienda.models import Producto

def index(request):
    return render(request, 'index.html', {'productos': Producto.objects.all()})

def croissant_mantequilla(request):
    return render(request, 'croissant-mantequilla.html',{})

def donut_azucar(request):
    return render(request, 'donut-azucar.html',{})

def donut_chocolate(request):
    return render(request, 'donut-chocolate.html',{})

def napolitana_3_chocolates(request):
    return render(request, 'napolitana-3-chocolates.html',{})

def palmera_hojaldre(request):
    return render(request, 'palmera-hojaldre.html',{})

def palmera_chocolate(request):
    return render(request, 'palmera-chocolate.html',{})
