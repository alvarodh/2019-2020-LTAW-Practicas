# Generated by Django 2.2.10 on 2020-03-02 18:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mi_tienda', '0015_auto_20200302_1821'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pedido',
            name='product',
        ),
        migrations.AddField(
            model_name='pedido',
            name='cart',
            field=models.CharField(default='[]', max_length=250),
        ),
    ]
