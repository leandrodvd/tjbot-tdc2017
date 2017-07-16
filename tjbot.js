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
console.log("configuration:");
console.log(configuration);
console.log("credentials:");
console.log(credentials);
var workspace_id = credentials.conversation.workspace_id[configuration.listen.language]
console.log("workspace_id:"+workspace_id);

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
  tj.speak("Olá");
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
    console.log(msg);
    tj.converse(workspace_id, msg, function(response) {
      // speak the result
      console.log(response);
      tj.pauseListening();
      var speakPromise = tj.speak(response.description);
      if (speakPromise != undefined){
	speakPromise.then(function(){tj.resumeListening()} );
      }
	else{
	 console.log("speak promise is undefined");
	 tj.resumeListening();
	}
    });
});

function processResponse(response){
  if (response.object.intents && response.object.intents.length>0){
    var intent =  response.object.intents[0].intent;
    if (intent =='time'){
      var message = new Date().toLocaleTimeString();
      response.output.text[0]=message;
      response.description=message;
    }
  }
  return response;
}
