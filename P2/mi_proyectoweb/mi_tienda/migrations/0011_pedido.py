# Generated by Django 2.2.10 on 2020-03-02 10:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mi_tienda', '0010_producto_prodpath'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pedido',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
                ('articulo', models.CharField(max_length=50)),
            ],
        ),
    ]
