# Generated by Django 2.0.7 on 2019-03-07 01:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20190307_1410'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sensor',
            name='humidity',
            field=models.FloatField(default=0.0),
        ),
        migrations.AlterField(
            model_name='sensor',
            name='temperature',
            field=models.FloatField(default=0.0),
        ),
    ]
