from pyfirmata import Arduino, util
import time

board = Arduino('/dev/ttyUSB0')
it = util.Iterator(board)
it.start()

print('✔ board ready!')


def handle_write(*data):
    print(data)


board.add_cmd_handler(0x02, handle_write)


def writePwmValue(pin, value):
    datasToWrite = []

    datasToWrite.append(pin)
    datasToWrite.append(0)
    datasToWrite.append(15)
    datasToWrite.append(10)

    v = divmod(value, 127)

    for i in range(1, v[0]):
        datasToWrite.append(127)

    if (v[0] >= 1):
        datasToWrite.append(v[1])
    else:
        datasToWrite.append(value)

    return datasToWrite


while True:
    board.send_sysex(0x04, writePwmValue(19, 1023))
    time.sleep(0.01)
