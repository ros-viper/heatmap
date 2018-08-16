from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Sensor

class SensorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sensor
        exclude = ('id',)