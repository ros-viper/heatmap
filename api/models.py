from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# Create your models here.

class Sensor(models.Model):
    serialID = models.IntegerField(null=False, primary_key=True, unique=True)
    name = models.CharField(default="Name", max_length=50)
    temperature = models.FloatField(default=0.00)
    humidity = models.FloatField(default=0.00)
    x = models.IntegerField(null=False)
    y = models.IntegerField(null=False)
    floor = models.CharField(null=False, default="one", max_length=30)

    def __str__(self):
        """A string representation of the model."""
        return f"{self.serialID} - {self.name}"

class History(models.Model):
    sensor = models.ForeignKey(Sensor, related_name='history', on_delete=models.CASCADE)
    temperature = models.FloatField(default=0.00)
    humidity = models.FloatField(default=0.00)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sensor} - {self.timestamp}"

# Generating authorization tokens upon user creation
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)