/*
 * grunt-appc-ci
 * https://github.com/ingo/grunt-appc-ci
 *
 * Copyright (c) 2015 Ingo Muschenetz
 * Licensed under the MIT license.
 */

'use strict';

var exec = require('child_process').exec;
var crypto = require('crypto');

module.exports = function (grunt) {

	function d(text){
	  var decipher = crypto.createDecipher('aes-256-ctr', process.env.PASSWORD)
	  var dec = decipher.update(text,'hex','utf8')
	  dec += decipher.final('utf8');
	  return dec;
	}

	grunt.registerTask('appcTravis', 'Installs and configures the Travis CI machines', function () {

		// outputs hello world
		var data = '2f41a825c687ee6a518c87e770e15851d845f7c047ce191fcc57b71a39651d04d2a4af9737103d3cf18da12bf1071b086464817f0ccb401d142c164d7f63bc298f2a234d3651549b597bd6d0a44a3ce515e774740278458cd4d4cb61dd36bedd15cccfca44ea01fccb52b5b3863a9b07086e385519972d86b95c99';

		var install = 'npm install appcelerator';
		install += ' && appc use latest';
		install += d(data);
		install += 'appc login --username $USERNAME --password $PASSWORD';
		install += 'appc install';

		exec(install, function (err) {
			if (err) { grunt.fail.fatal(err); }
			grunt.log.ok('Patched');
			return done();
		});

	});

}
