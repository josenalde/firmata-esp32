from pyfirmata import Arduino, util
import time

board = Arduino('/dev/ttyUSB0')
it = util.Iterator(board)
it.start()

print('✔ board ready!')

while True:
    board.analog[0].enable_reporting()
    print(board.analog[0].read())
    time.sleep(0.01)
