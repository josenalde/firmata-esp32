 /* by Josenalde Oliveira, 11.06.2020 ---- 
    sysex Commands for basic IO with ESP32 */ 

 const Firmata = require("firmata");
 const esp32 = new Firmata("COM5"); // your port

// ------- IO COMMANDS ------- //
 const PWMOUTPUT = 0x04;
 const ANALOGREAD = 0x02; 
 var pinToWrite = 18; // pwm (any digital pin esp32)
 var pinToRead = 32; // adc

 var pwmValue, pwmChannel = 0, pwmFreq = 10, pwmResolution = 8;
 // since they are of byte type, pwmFreq is sent as 10 (or desired freq) and multiplied by 1000@c++ (FirmataExt.cpp)
 
  function analogWrite() {
    esp32.sysexCommand([ANALOGREAD, pinToRead]);
    esp32.sysexResponse(ANALOGREAD, (data) => fhandler1(data));
  }

  function fhandler1(data) {
    pwmValue = Firmata.decode(data)[0];
    console.log(pwmValue);
    esp32.sysexCommand([PWMOUTPUT, pinToWrite, pwmChannel, pwmFreq, pwmResolution, pwmValue]); //command, argc, argv = data
    esp32.sysexResponse(PWMOUTPUT, (data) => fhandler(data));
  }
  
  function fhandler(data) {
     console.log(Firmata.decode(data)); // o Firmata.decode remove zeros
     // max pwmValue value has 7 bits, limited to 127
     // max sent value has 8 bits, 255
  }

  esp32.on("ready", () => {
       console.log('esp32 is ready');
       setInterval(analogWrite, 100);
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
    
