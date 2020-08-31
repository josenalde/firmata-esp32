 /* by Josenalde Oliveira, 11.06.2020 ---- 
    sysex Commands for basic IO with ESP32 */ 
 const Firmata = require("firmata");
 const esp32 = new Firmata("COM5"); // your port

// ------- IO COMMANDS ------- test a button read and turns a led on-off accordingly//
 const DIGITALREAD = 0x03; 
 const DIGITALWRITE = 0x01;

 var pinState; //for the first iteration
 var pinToRead = 26; // example pin
 var pinToWrite = 2; // example pin (internal esp32)
 
  function digitalRead() {
    esp32.sysexCommand([DIGITALREAD, pinToRead]); //command, argc, argv = data
    esp32.sysexResponse(DIGITALREAD, (data) => fhandler(data));
  }

  function fhandler(data) {
     pinState = Firmata.decode(data)[0];
     esp32.sysexCommand([DIGITALWRITE, pinToWrite, pinState]);
     //console.log(pinState);
  }

  esp32.on("ready", () => {
       console.log('esp32 is ready');
       setInterval(digitalRead, 100);
  });
        // framework -> esp32 (hw firmata.h host)
        //    argv[0] = 2 (pin), argv[1] = 2 (times), argv[2] = duration
        // esp32 (hw firmata.h host) -> framework
        //    Firmata.sendSysex(command, argc, argv) calls sendValueAsTwo7bitBytes(bytev[i]);    
        /*
        * Split a 16-bit byte into two 7-bit values and write each value.
        * @param value The 16-bit value to be split and written separately.
        
        void FirmataClass::sendValueAsTwo7bitBytes(int value)
        {
          FirmataStream->write(value & B01111111); // LSB
          FirmataStream->write(value >> 7 & B01111111); // MSB
        }
        // [2, 0, 2, 0, 5, 0] - with decode: [2,2,5]
        */    
    
