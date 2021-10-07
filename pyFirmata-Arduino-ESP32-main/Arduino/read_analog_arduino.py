from pyfirmata import Arduino, util
import time

board = Arduino('/dev/ttyUSB0')
it = util.Iterator(board)
it.start()

print('✔ board ready!')

while True:
    analog_read = board.get_pin('a:0:i')  # a = analog, 0 = pin, i = INPUT
    print(analog_read.read())
    time.sleep(0.01)
