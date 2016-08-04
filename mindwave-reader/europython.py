from NeuroPy import NeuroPy
import time
from Queue import Queue
import execjs

#object1=NeuroPy("/Dev/tty.MindWaveMobile-DevA",57600)
nodejs = execjs.get(execjs.runtime_names.Node)
with open("example.js") as f:
    bb8api = nodejs.compile(f.read())

def attention_callback(value):
    print("Attention:",value)
    if value > 70:
        print bb8api.call("sum", value, 0)
        print("Go")

    return None

def meditation_callback(value):
    print("Meditation:",value)
    if value > 90:
        print bb8api.call("sum", value, 0)
        print("Turn")
    return None

#set call back:
#object1.setCallBack("attention",attention_callback)
#object1.setCallBack("meditation", meditation_callback)

#object1.start()

queue = Queue(3)

while True:
    print bb8api.call("datef")
