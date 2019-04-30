import paho.mqtt.client as mqtt
import base64
import json

broker = "iot.op-bit.nz"

def on_connect(client, userdata, flags, rc):
    client.subscribe("application/2/#")
    print("Connected with result code " + str(rc))

def on_message(client, userdata, message):
    from .models import Sensor, History

    try:
        json_data = json.loads(str(message.payload.decode("utf-8")))
        print(json_data)
        data = base64.b64decode(json_data['data']).decode("utf-8")
        print(data)
        devID = int(json_data['devEUI'])
        sensor = Sensor.objects.get(serialID=devID)
        temperature = base64.b64decode(json_data['data']).decode("utf-8")[3:8]
        humidity = base64.b64decode(json_data['data']).decode("utf-8")[15:20]

        sensor.temperature = float(temperature)
        sensor.humidity = float(humidity)

        sensor.save()
        print(f"Sensor updated: {sensor}")
        history = History.objects.create(sensor=sensor, temperature=temperature, humidity=humidity)
        print(f"History created: {history}")

    except UnicodeDecodeError as e:
        print("Unicode error " + str(e))
    except Exception as e:
        print("Error " + str(e))


client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect(broker, 1883, 60)

