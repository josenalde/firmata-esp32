from pyfirmata import Arduino, util
import time

board = Arduino('/dev/ttyUSB0')
it = util.Iterator(board)
it.start()

print('✔ board ready!')

board.digital[4].write(1)  # 1 = HIGH, 0 = LOW
