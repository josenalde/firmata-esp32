from pyfirmata import Arduino, util

board = Arduino('/dev/ttyUSB0')
it = util.Iterator(board)
it.start()

print('✔ board ready!')

analog_write = board.get_pin('d:9:p')  # d = digital, 9 = pin, p = PWM
analog_write.write(0.6)
