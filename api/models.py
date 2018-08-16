from django.db import models

# Create your models here.

class Sensor(models.Model):
    serialID = models.IntegerField(null=False)
    temperature = models.FloatField(null=True)
    humidity = models.FloatField(null=True)
    luminosity = models.FloatField(null=True)

    def __str__(self):
        """A string representation of the model."""
        return f'{self.serialID}'