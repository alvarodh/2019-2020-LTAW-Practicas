# -- Fichero mi_tienda/views.py
from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
from django.shortcuts import render
from random import randint
from mi_tienda.models import Producto

def index(request):
    return render(request, 'index.html', {'numero1': str(randint(0, 100)), 'numero2': str(randint(0, 100))})

def producto1(request):
    return render(request, 'producto1.html')

def producto2(request):
    return render(request, 'producto2.html')

def producto3(request):
    return render(request, 'producto3.html')

def list(request):
    productos = Producto.objects.all()
    html = "<h2>Listado de articulos</h2>"
    for prod in productos:
        print(prod.nombre)
        html += '<p>'+ prod.nombre + ' ' + str(prod.precio) + '<p>'
    return HttpResponse(html)

def list2(request):
    productos = Producto.objects.all()
    return render(request, 'listado.html', {'productos':productos})
