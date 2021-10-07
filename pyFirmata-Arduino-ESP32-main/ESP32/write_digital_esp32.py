from pyfirmata import Arduino, util

board = Arduino('/dev/ttyUSB0')
it = util.Iterator(board)
it.start()

print('✔ board ready!')

while True:
    board.send_sysex(0x01, [12, 1])
