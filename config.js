// uncomment and update the configuratin parameters
// that you want to overwrite
module.exports =
{ log: { level: 'info' },
  robot:
  {
    gender: 'female',
    name: 'Rose'
  },
  listen:
  {
     // microphoneDeviceId: 'plughw:1,0',
     //inactivityTimeout: -1,
     language: 'pt-BR'
  },
  // wave: {
  //   servoPin: 7
  // },
  speak:
   {
     language: 'pt-BR',
    //  voice: undefined,
    //  speakerDeviceId: 'plughw:0,0'
  },
  // see:
  //  {
  //    confidenceThreshold: { object: 0.5, text: 0.1 },
  //    camera: { height: 720, width: 960, vflip: false, hflip: false }
  //  }
 }
