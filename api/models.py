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

    @property
    def color(self):
        if self.temperature > 23.00:
            return 'red'
        elif self.temperature < 23.00 and self.temperature > 20:
            return 'orange'
        else:
            return 'lightblue'

    def __str__(self):
        """A string representation of the model."""
        return str(self.serialID)

# Generating authorization tokens upon user creation
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)