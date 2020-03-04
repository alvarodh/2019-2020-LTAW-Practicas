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

def producto(request, product):
    p = Producto.objects.get(prodpath__startswith=product)
    return render(request, 'producto.html', {'prod': p})

def add_to_cart(request, product):
    try:
        prodname = Producto.objects.get(prodpath__startswith=product).name
    except:
        prodname = ""
    return render(request, 'pedido.html', {'prodname': prodname,
                                           'register_form': False,
                                           'action': 'recibido'})

def search_product(request):
    try:
        p = Producto.objects.get(name=request.POST['producto'])
        return render(request, 'producto.html', {'prod': p})
    except:
        return render(request, 'producto.html', {})

def show_cart(request):
    try:
        p = Pedido.objects.get(name=request.POST['nombre'])
        return render(request, 'carrito.html', {'cart': json.loads(p.cart),
                                                'total': p.total})
    except:
        return render(request, 'pedido.html', {'register_form': True,
                                               'action': 'show-cart'})

def recibido(request):
    try:
        p = Pedido.objects.get(name=request.POST['nombre'])
    except:
        p = Pedido(name=request.POST['nombre']);
    cart = json.loads(p.cart)
    c = request.POST['cantidad']
    prod = Producto.objects.get(name=request.POST['producto'])
    if prod.stock - int(c) >= 0:
        if not request.POST['producto'] in cart:
            cart.append(request.POST['producto'])
            cart.append([int(c)])
        else:
            cart[cart.index(request.POST['producto'])+1][0] += int(c)
        p.cart = json.dumps(cart)
        p.total += prod.price * int(c)
        prod.stock -= int(c)
        p.save()
        prod.save()
        return index(request)
    else:
        return render(request, 'no-stock.html', {'prod': prod})
