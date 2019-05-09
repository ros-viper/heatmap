# Generated by Django 2.0.7 on 2019-04-04 01:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20190314_1426'),
    ]

    operations = [
        migrations.CreateModel(
            name='History',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('temperature', models.FloatField(default=0.0)),
                ('humidity', models.FloatField(default=0.0)),
                ('timestamp', models.DateTimeField()),
                ('sensor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Sensor')),
            ],
        ),
    ]