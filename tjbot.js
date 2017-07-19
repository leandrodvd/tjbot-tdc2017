const TJBot = require('tjbot');
const led = require('./lib/led.js');
const request = require('request');

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
  led.setLED(0,1,1);
  tj.sleep(500);
  console.log("green");
  led.setLED(1,0,1);
  tj.sleep(500);
  console.log("blue");
  led.setLED(1,1,0);
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

function r01(){
  // return a random 0 or 1
  return Math.round(Math.random());
}
function randomColor(){
  var r = r01();
  var g = r01();
  var b = r01();
 console.log("change color to:"+r+" "+g+" "+ b);
  led.setLED(r,g,b);
}
// listen for utterances and send the result to
// the Conversation service
tj.listen(function(msg) {
  // send to the conversation service
    console.log(msg);
    tj.converse(workspace_id, msg, function(response) {
      // speak the result
      console.log(response);
      response = processResponse(response);
      tj.pauseListening();
      var speakPromise = tj.speak(response.description);
      if (speakPromise != undefined){
      	speakPromise.then(function(){
      	executeAction(response);
      	tj.resumeListening()} );
      }
      else{
    	 console.log("speak promise is undefined");
    	 tj.resumeListening();
    	}
    });
});

function getWeather(callback){
  const base_url = credentials.weather.url;
  const lat = credentials.weather.lat;
  const long = credentials.weather.long;
  const url = base_url+ "/api/weather/v1/geocode/"+ lat + "/"+ long + "/observations.json?language=pt-BR&units=m";

  request(url, function(error, response, body) {
    var message = "";
    if(error){
      message = "Não consegui acessar o serviço de clima";
    }
    else{
      var obs_json = JSON.parse(body)
      message = "O tempo lá fora está " + obs_json.observation.wx_phrase + " e a temperatura é de " + obs_json.observation.temp + " graus celsius";
    }
    return callback(error,message);
  });
}

function processResponse(response){
  if (response.object.intents && response.object.intents.length>0){
    var intent =  response.object.intents[0].intent;
    if (intent =='time'){
      var message = new Date().toLocaleTimeString().substring(0,5);
      console.log("message replaced: "+message);
      response.object.output.text[0]=message;
      response.description=message;
    }
    if (intent == 'weather'){
      getWeather(function(err,message){
        if(err){
          console.log(err);
        }
        tj.speak(message);
      });
    }
  }
  return response;
}

function executeAction(response){
  if (response.object.intents && response.object.intents.length>0){
    var intent =  response.object.intents[0].intent;
    if(intent=='changeColor'){
      console.log("change color");
      randomColor();
    }
    else if(intent=='folks'){
      console.log("folks wave");
      tj.wave();
      tj.wave();
      tj.wave();
    }
    else if(intent=='bye'){
      console.log("bye wave");
      tj.wave();
      tj.wave();
    }
    else if(intent=='arms'){
     console.log("wave arm");
     tj.wave();
     tj.wave();
     tj.wave();
    }
  }
  return response;
}
