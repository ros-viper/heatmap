from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Sensor
from .serializers import SensorSerializer

# Create your views here.

@api_view(['GET'])
def sensor_list(request):

    if request.method == 'GET':
        sensors = Sensor.objects.all()
        serializer = SensorSerializer(sensors, many=True)

        return Response(serializer.data)
