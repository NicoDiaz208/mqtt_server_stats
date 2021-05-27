import paho.mqtt.client as paho
import platform,socket,re,uuid,json,psutil,logging
broker="broker.mqttdashboard.com"
def on_publish(client,userdata,result):
    print("data published \n")
    pass

def getSystemInfo():
    info={}
    info['platform']=platform.system()
    info['platform-release']=platform.release()
    info['platform-version']=platform.version()
    ##info['architecture']=platform.machine()
    ##info['hostname']=socket.gethostname()
    ##info['ip-address']=socket.gethostbyname(socket.gethostname())
    ##info['mac-address']=':'.join(re.findall('..', '%012x' % uuid.getnode()))
    info['processor']=platform.processor()
    info['ram']=str(round(psutil.virtual_memory().total / (1024.0 **3)))+" GB"
    return info



information = getSystemInfo()

client1= paho.Client("control1")
client1.on_publish = on_publish
client1.connect(broker)
ret= client1.publish("test/bulb1",information.__str__())

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
