from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('<id>.html', views.producto, name='producto'),
    path('<id>-add', views.add_to_cart, name='add to cart'),
    path('show-cart', views.show_cart, name='show cart'),
    path('recibido', views.recibido, name='recibido'),
]
