from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Sensor

class SensorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sensor
        fields = ('serialID', 'name', 'temperature', 'humidity', 'x', 'y', 'color', 'floor')

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username')