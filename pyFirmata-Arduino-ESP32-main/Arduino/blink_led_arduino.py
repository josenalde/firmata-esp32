from pyfirmata import Arduino, util
import time

# program to make the blink led

board = Arduino('/dev/ttyUSB0')
it = util.Iterator(board)
it.start()

while True:
    board.digital[13].write(1)
    print('Led on')

    time.sleep(1)

    board.digital[13].write(0)
    print('Led off')

    time.sleep(1)
