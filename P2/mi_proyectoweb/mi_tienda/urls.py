from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('<product>.html', views.producto, name='producto'),
    path('<product>-add', views.add_to_cart, name='add to cart'),
    path('show-cart', views.show_cart, name='show cart'),
    path('recibido', views.recibido, name='recibido'),
    path('search', views.search_product, name='search product'),
    path('register', views.register, name='register client'),
    path('add-client', views.add_client, name='add client'),
    path('pay', views.pay, name='pay order'),
]
