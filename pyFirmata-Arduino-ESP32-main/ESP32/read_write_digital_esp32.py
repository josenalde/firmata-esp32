from pyfirmata import Arduino, util
import time

board = Arduino('/dev/ttyUSB0')
it = util.Iterator(board)
it.start()

print('✔ board ready!')


def handle_read_write(*data):
    print(data[0])
    board.send_sysex(0x01, [12, data[0]])


board.add_cmd_handler(0x03, handle_read_write)

while True:
    board.send_sysex(0x03, [18])
    time.sleep(0.01)
