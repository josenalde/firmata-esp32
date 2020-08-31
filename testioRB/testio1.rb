# #!/usr/bin/env ruby
#$:.unshift File.expand_path '../../lib', File.dirname(__FILE__)

#require'rubygems'
require'arduino_firmata'

esp32 = ArduinoFirmata.connect "COM5"
puts "firmata version #{esp32.version}"

## regist event
esp32.on :sysex do |command, data|
    if command == 0x03
        puts"command : #{command}"
        puts"data : #{data.inspect}"
        puts'------------------------------------'
    end
end

## send sysex command at the case analog read 0x03
#read at pin 32

loop do
    esp32.sysex 0x03, [32, 33]
    sleep 0.001
end
