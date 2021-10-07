from pyfirmata import Arduino, util
import time

board = Arduino('/dev/ttyUSB0')
it = util.Iterator(board)
it.start()

print('✔ board ready!')

while True:
    digital_read = board.digital[4].read()
    board.digital[8].write(digital_read)
    time.sleep(0.01)
