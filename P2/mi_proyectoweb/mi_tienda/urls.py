from django.urls import path
from . import views


urlpatterns = [
    # -- Vista pricipal (índice)
    path('', views.index, name='index'),
    path('croissant-mantequilla.html', views.croissant_mantequilla, name='croissant_mantequilla'),
    path('donut-azucar.html', views.donut_azucar, name='donut_azucar'),
    path('donut-chocolate.html', views.donut_chocolate, name='donut_chocolate'),
    path('napolitana-3-chocolates.html', views.napolitana_3_chocolates, name='napolitana_3_chocolates'),
    path('palmera-hojaldre.html', views.palmera_hojaldre, name='palmera_hojaldre'),
    path('palmera-chocolate.html', views.palmera_chocolate, name='palmera_chocolate'),
]
