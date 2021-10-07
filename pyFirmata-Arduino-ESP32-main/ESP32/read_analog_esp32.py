from pyfirmata import Arduino, util
import time

board = Arduino('/dev/ttyUSB0')
it = util.Iterator(board)
it.start()

print('✔ board ready!')


def handle_read(*data):
    print(data)


board.add_cmd_handler(0x02, handle_read)

while True:
    board.send_sysex(0x02, [32])
    time.sleep(0.01)
