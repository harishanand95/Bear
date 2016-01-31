var speech = require('google-speech-api');
var opts = {
  file:'/tmp/test.flac',
  key: 'AIzaSyDXbqhPK9BFbWGKzSesew1c6kNjNT9ExJ8'
};

speech(opts, function (err, results) {
  
  console.log(JSON.stringify(results));  
  //console.log(err);  
});
