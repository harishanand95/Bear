var speech = require('google-speech-api');
var opts = {
  file:'/tmp/test.wav',
  key: 'GOOGLE SPEECH API KEY'
};

speech(opts, function (err, results) {
  
  console.log(JSON.stringify(results));  
  //console.log(err);  
});
