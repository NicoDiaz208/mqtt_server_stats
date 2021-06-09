import time
import paho.mqtt.client as paho
import platform, socket, re, uuid, psutil

broker = "broker.mqttdashboard.com"


def on_publish(client,userdata,result):
    print("data published \n")
    pass


def getSystemInfo():
    info = {}
    info['platform'] = platform.system()
    info['platform-release'] = platform.release()
    info['platform-version'] = platform.version()
    info['architecture'] = platform.machine()
    info['hostname'] = socket.gethostname()
    ##info['ip-address'] = socket.gethostbyname(socket.gethostname())
    ##info['mac-address'] = ':'.join(re.findall('..', '%012x' % uuid.getnode()))
    info['processor'] = platform.processor()
    info['CPU auslastung'] = psutil.cpu_percent()
    info['ram'] = str(round(psutil.virtual_memory().total / (1024.0 ** 3))) + " GB"
    info['ram asulastung'] = psutil.virtual_memory().percent
    return info




client = paho.Client("ServerStatus")

while True:
    information = getSystemInfo()
    client.on_publish = on_publish
    client.connect(broker)
    ret = client.publish("test/HTLLeonding/MQTT/NCA", information.__str__())
    time.sleep(10)
