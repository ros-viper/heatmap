# Generated by Django 2.0.7 on 2019-03-07 01:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20181122_1335'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sensor',
            name='humidity',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sensor',
            name='temperature',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
