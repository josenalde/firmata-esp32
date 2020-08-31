/*https://www.npmjs.com/package/arduino-firmata
  out of date - 4 years - 0.3.4

  use https://github.com/firmata/firmata.js?utm_source=recordnotfound.com
  https://www.npmjs.com/package/firmata 2.2.0, updated
  10.06.2020

  npm install firmata
  */
 /* by Josenalde Oliveira, 11.06.2020 ---- 
    sysex Commands for basic IO with ESP32 */ 

 const Firmata = require("firmata");
 const esp32 = new Firmata("COM5"); // your port
// ------- IO COMMANDS ------- //
 const DIGITALWRITE = 0x01; 
 const ADCREAD  = 0x02;
 
 var pinState = false; //for the first iteration
 var pinToWrite = 19; //an example, change your pin accordingly
 
  function digitalWrite() {
    esp32.sysexCommand([DIGITALWRITE, pinToWrite, !pinState]); //command, argc, argv = data
    esp32.sysexResponse(DIGITALWRITE, (data) => fhandler(data));
  }

  function fhandler(data) {
    /* o array data possui tamanho 2n, sendo n o número de parâmetros
       pode usar os índices pares para obter os dados, já que nos ímpares
       vem um zero. Se usar o decode, ele altera o dado original e tem alguns
       artificios. Se usar o data mesmo, não há problema: */
    pinState = Firmata.decode(data)[1]; // atualiza o estado que foi setado no esp32
    //pinState = data[2];
  }

  esp32.on("ready", () => {
       console.log('esp32 is ready');
       setInterval(digitalWrite, 1000);
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
    
