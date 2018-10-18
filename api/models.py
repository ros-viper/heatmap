from django.db import models

# Create your models here.

class Sensor(models.Model):
    serialID = models.IntegerField(null=False)
    temperature = models.FloatField(null=True)
    humidity = models.FloatField(null=True)
    luminosity = models.FloatField(null=True)
    x = models.IntegerField(null=False)
    y = models.IntegerField(null=False)
    floor = models.CharField(null=False, default="d2", max_length=30)

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
        return f'{self.serialID}'