var exec = require('child-process-promise').exec;

/*
 * apps array
 * 
 * note: You must add new apps here to make them part of the install process.
 *
 * name: 'string', name of the directory e.g. 'simple-express-server'
 * npm: 'boolean', true or false. (if npm installs are needed, set to true)
 * bower: 'boolean', true of false. (if bower installs are needed, set to true)
 *
*/
var apps = [
            { 
                name: 'simple-express-server',
                npm: true,
                bower: false
            },
            {
                name: 'express-in-context',
                npm: true,
                bower: false
            }
    ];

function callback(err, result) {
    if(err){
        console.log('----- AN ERROR OCCURED -----');
        console.log(err);
    } else {
        if(result.npm === true){
            console.log(result.name + ' NPM packages installed!');
        } else { 
            //no output
        }
        if(result.bower === true){
            console.log(result.name + ' bower packages installed!');
        } else {
            //no output
        } 
    }
}

exec('npm install;')
    .then(function (result0) {
        console.log('node-app-examples NPM packages installed!');
        apps.forEach(function (application) {
            var command = 'cd ' + application.name + '; ';
            if(application.npm === true) {
                command += 'npm install; ';
            }
            if(application.bower === true) {
                command += 'bower install;'
            }
            exec(command)
                .then(function (result) {
                    callback(null, application);
                })
                .catch(function (err) {
                    callback(err);
                });
        });
    })
    .catch(function (err) {
        console.log('ERROR while installing NPM packages for node-app-examples');
    });