# Generated by Django 2.0.7 on 2019-03-14 01:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_auto_20190314_1415'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sensor',
            name='serialID',
            field=models.IntegerField(primary_key=True, serialize=False, unique=True),
        ),
    ]
