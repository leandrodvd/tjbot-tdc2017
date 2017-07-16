const TJBot = require('tjbot');
const led = require('lib/led.js');

console.log("Default configuration:" )
console.log(TJBot.prototype.defaultConfiguration);
console.log("Default speak config:")
console.log(TJBot.prototype.languages.speak);
console.log("Default listen config:")
console.log(TJBot.prototype.languages.listen)

console.log("init tjbot");
var hardware = ['led', 'microphone', 'servo','speaker'];
var configuration = require('./config.js');
var credentials = require('./credentials.js');
var tj = new TJBot(hardware, configuration, credentials);

function testLed(){
  console.log("test leds");
  led.setLED(1,0,0);
  tj.sleep(500);
  led.setLED(0,1,0);
  tj.sleep(500);
  led.setLED(0,0,1);
  tj.sleep(500);
}

function testServo(){
  console.log("test servo arm");
  tjbot.wave();
}

function testSTT(){
  console.log("test speech to text");
  tjbot.speak("1 2 3 4 5 6");
}

function test(){
  testLed();
  testServo();
  testSTT();
}

test();
