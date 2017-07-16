const TJBot = require('tjbot');
const led = require('./lib/led.js');

console.log("Default configuration:" )
console.log(TJBot.prototype.defaultConfiguration);
console.log("Default speak config:")
console.log(TJBot.prototype.languages.speak);
console.log("Default listen config:")
console.log(TJBot.prototype.languages.listen)

console.log("init tjbot");
var hardware = [ 'microphone','speaker', 'servo'];

var configuration = require('./config.js');
var credentials = require('./credentials.js');
var workspace_id = credentials.workspace_id[config.listen.language]
console.log("workspace_id:"+workspace_id);
console.log("configuration:");
console.log(configuration);
var tj = new TJBot(hardware, configuration, credentials);

function testLed(){
  console.log("test leds");
  console.log("red");
  led.setLED(1,0,0);
  tj.sleep(500);
  console.log("green");
  led.setLED(0,1,0);
  tj.sleep(500);
  console.log("blue");
  led.setLED(0,0,1);
  tj.sleep(500);
}

function testServo(){
  console.log("test servo arm");
  tj.wave();
}

function testTTS(){
  console.log("test Text To Speech");
  tj.speak("teste 1 2 3");
}

function test(){
  testLed();
  testServo();
  testTTS();
}

test();

// listen for utterances and send the result to
// the Conversation service
tj.listen(function(msg) {
  // send to the conversation service
    tj.converse(workspace_id, turn, function(response) {
      // speak the result
      console.log(response);
      tj.speak(response.description);
    });
});
