# Generated by Django 2.0.7 on 2019-04-04 01:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_history'),
    ]

    operations = [
        migrations.AlterField(
            model_name='history',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]