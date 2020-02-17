from django.urls import path

# -- Importar todas las vistas de mi_tienda
from . import views

# -- Aquí se definen las URLs de nuestra tienda
# -- Metemos de momento sólo la principal (índice)

urlpatterns = [
    # -- Vista pricipal (índice)
    path('', views.index, name='index'),
    path('producto1/', views.producto1, name='producto1'),
    path('producto2/', views.producto2, name='producto2'),
    path('producto3/', views.producto3, name='producto3'),
]
