var prompt = require('prompt');
var exec = require('child-process-promise').exec;

prompt.start();

prompt.get(['client_id', 'client_secret'], function (err, result) {
    var sandbox = '{ \"client_id\": \"' + result.client_id + '\", \"client_secret\": \"' + result.client_secret + '\" }';
    exec('mkdir ppconfig;');
    exec("echo '" + sandbox + "' > ppconfig/sandbox.json;")
    	.then(function (result) {
    		console.log('The directory ppconfig was created');
    		console.log('The file sandbox.json was created');
    		console.log('The following was written to sandbox.json:');
    		console.log(sandbox);
    	})
    	.catch(function (err) {
    		console.log('An Error occured while creating ppconfig/sandbox.json');
    		console.log(err);
    	});
});