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
 const PWMOUTPUT = 0x04;
 const ANALOGREAD = 0x02; 
 var pinToWrite = 18;
 var pinToRead = 32;
 var pwmValue, pwmChannel = 0, pwmFreq = 10, pwmResolution = 8;
 // visto que é tipo byte, pwmFreq é enviado como 5 e multiplicado por 1000 no c++
 
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
     console.log(Firmata.decode(data)); // o Firmata.decode remove os zeros
     // o valor pwmValue está retornando com 7 bits, limitado a 127
     // o valor máximo enviado é de 8 bits, 255
  }

  esp32.on("ready", () => {
       console.log('esp32 is ready');
       setInterval(analogWrite, 100);
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
    