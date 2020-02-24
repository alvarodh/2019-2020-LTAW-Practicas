from django.urls import path
from . import views


urlpatterns = [
    # -- Vista pricipal (índice)
    path('', views.index, name='index'),
    path('producto1/', views.producto1, name='producto1'),
    path('producto2/', views.producto2, name='producto2'),
    path('producto3/', views.producto3, name='producto3'),
]
