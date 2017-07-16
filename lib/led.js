var Gpio = require('onoff').Gpio;

var led_RED = new Gpio(17, 'out');
var led_GREEN = new Gpio(27, 'out');
var led_BLUE = new Gpio(22, 'out');

exports.setLED=function(r,g,b){
    led_RED.writeSync(r);
    led_GREEN.writeSync(g);
    led_BLUE.writeSync(b);
}
