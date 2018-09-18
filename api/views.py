from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Sensor
from .serializers import SensorSerializer

import paho.mqtt.client as mqtt

# Create your views here.

@api_view(['GET'])
def sensor_list(request):

    if request.method == 'GET':
        sensors = Sensor.objects.all()
        serializer = SensorSerializer(sensors, many=True)

        return Response(serializer.data)

@api_view(['GET', 'POST'])
def paho(request):
    broker = "m2m.eclipse.org"

    if request.method =='GET':
        sensors = Sensor.objects.all()
        serializer = SensorSerializer(sensors, many=True)
        def on_message(client, userdata, message):
            print("received message =", str(message.payload.decode("utf-8")))

        def on_connect(client, userdata, flags, rc):
            print("Connected with result code" + str(rc))

        client = mqtt.Client()
        client.on_message = on_message
        client.on_connect = on_connect
        print("connecting to broker ", broker)
        client.connect(broker, 1883, 60)  # connect
        # client.subscribe("$SYS/#", 0)
        client.loop_forever()
        # client.loop_start()  # start loop to process received messages
        #
        # client.disconnect()  # disconnect
        # client.loop_stop()  # stop loop

        return Response(serializer.data)
