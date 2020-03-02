# -- Fichero mi_tienda/views.py
from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
from django.shortcuts import render
from random import randint
from mi_tienda.models import Producto, Pedido
import json

def index(request):
    return render(request, 'index.html', {'productos': Producto.objects.all()})

def producto(request, id):
    prod = Producto.objects.filter(prodpath=id + '.html')[0]
    return render(request, 'producto.html', {'prod': prod})

def add_to_cart(request, id):
    try:
        prodname = Producto.objects.filter(prodpath=id + '.html')[0].name
    except:
        prodname = ""
    return render(request, 'pedido.html', {'prodname': prodname,
                                           'register_form': False,
                                           'action': 'recibido'})

def show_cart(request):
    try:
        name = request.POST['nombre']
        cart =  Pedido.objects.filter(name=name)[0].cart
        return render(request, 'carrito.html', {'cart': json.loads(cart)})
    except:
        return render(request, 'pedido.html', {'register_form': True,
                                               'action': 'show-cart'})

def recibido(request):
    try:
        cart = json.loads(Pedido.objects.filter(name=request.POST['nombre'])[0].cart)
        cart.append(request.POST['producto'])
        p = Pedido.objects.filter(name=request.POST['nombre'])[0]
        p.cart = json.dumps(cart)
        p.save()
    except:
        Pedido(name=request.POST['nombre'],cart=json.dumps([request.POST['producto']])).save()

    return index(request)
