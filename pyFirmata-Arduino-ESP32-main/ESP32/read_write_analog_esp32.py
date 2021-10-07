from pyfirmata import Arduino, util
import time

board = Arduino('/dev/ttyUSB0')
it = util.Iterator(board)
it.start()

print('✔ board ready!')


def handle_read_write(*data):
    print(data)

    datasToWrite = []

    datasToWrite.append(19)
    datasToWrite.append(0)
    datasToWrite.append(15)
    datasToWrite.append(10)

    rawV = 0

    for i in data:
        rawV = rawV + i
        datasToWrite.append(i)

    print(rawV)
    board.send_sysex(0x04, datasToWrite)


board.add_cmd_handler(0x02, handle_read_write)

while True:
    board.send_sysex(0x02, [32])
    time.sleep(0.01)
