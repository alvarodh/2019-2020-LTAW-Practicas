from django.db import models

class Producto(models.Model):
    """Modelo de datos de mis productos"""

    name = models.CharField(max_length=50)
    stock = models.IntegerField(default=0)
    price = models.FloatField()
    imgpath = models.CharField(max_length=50)
    prodpath = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Pedido(models.Model):
    """Modelo de datos de mis productos"""

    nombre = models.CharField(max_length=50)
    producto = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre + ": " + self.producto
