# Generated by Django 2.2.10 on 2020-02-24 11:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mi_tienda', '0006_producto_imgpath'),
    ]

    operations = [
        migrations.RenameField(
            model_name='producto',
            old_name='imgpath',
            new_name='firsteq',
        ),
        migrations.AddField(
            model_name='producto',
            name='secondeq',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AddField(
            model_name='producto',
            name='thirdeq',
            field=models.CharField(default='', max_length=50),
        ),
    ]
