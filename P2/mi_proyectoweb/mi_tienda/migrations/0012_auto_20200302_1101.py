# Generated by Django 2.2.10 on 2020-03-02 11:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mi_tienda', '0011_pedido'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pedido',
            old_name='articulo',
            new_name='producto',
        ),
    ]
