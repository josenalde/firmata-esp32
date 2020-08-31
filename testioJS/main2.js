/*https://www.npmjs.com/package/arduino-firmata
  fora de uso - 4 anos - 0.3.4

  utilizar https://github.com/firmata/firmata.js?utm_source=recordnotfound.com
  https://www.npmjs.com/package/firmata 2.2.0, 5 meses atrás
  10.06.2020

  npm install firmata
  */
 /* by Josenalde Oliveira, 11.06.2020 ---- 
    sysex Commands for basic IO with ESP32 */ 
 const Firmata = require("firmata");
 const esp32 = new Firmata("COM5");
// ------- IO COMMANDS ------- //

 const ADCREAD  = 0x02;
 
 var adcPinToRead = 32;
 var rawValue, voltageValue;
 
  function analogRead() {
    esp32.sysexCommand([ADCREAD, adcPinToRead]); //command, argc, argv = data
    esp32.sysexResponse(ADCREAD, (data) => fhandler(data));
  }

  function fhandler(data) {
    rawValue = Firmata.decode(data)[0];
    voltageValue = rawValue * (3.3/256);
    console.log(voltageValue); 
  }

  esp32.on("ready", () => {
       console.log('esp32 is ready');
       setInterval(analogRead, 100);
  });
        // framework -> esp32 (hw firmata.h host)
        //    argv[0] = 2 (pin), argv[1] = 2 (times), argv[2] = duration
        // esp32 (hw firmata.h host) -> framework
        //    Firmata.sendSysex(command, argc, argv) usa sendValueAsTwo7bitBytes(bytev[i]);    
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
    