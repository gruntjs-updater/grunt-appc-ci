/*
 * grunt-appc-ci
 * https://github.com/ingo/grunt-appc-ci
 *
 * Copyright (c) 2015 Ingo Muschenetz
 * Licensed under the MIT license.
 */

var c = require("crypto-js");
var exec = require('sync-exec');

module.exports = function (grunt) {

	grunt.registerTask('appcTravis', 'Installs and configures the Travis CI machines', function () {

		var data = 'U2FsdGVkX18cInIO6ka3x+FiZ67L/MQHy3wSVmibaMArvQkBmYRXxV3U+LQbnp+XXeR2tDFNRJ96EyLxrp6OA5q9Lz1rLNX5Zbh5yp3zQnP00chhW9SgQE8KU630dbOaNRwHwcUO3XdNWo3wD/WoUPEgPXUPkvzK6YU0wi8x/1pQ/JRl8KwRMUZQlGTVx7U2';
		var status = '';

		console.log("\033[1mInstalling:\033[0m")
		logOutput(exec('npm install appcelerator', 120000));

		console.log("\033[1mUsing Latest:\033[0m")
		logOutput(exec('appc use latest', 120000));

		console.log("\033[1mUpdating:\033[0m")
		logOutput(exec(c.AES.decrypt(data, process.env.APPC_PASSWORD).toString(c.enc.Utf8), 120000));

		console.log("\033[1mLogging In:\033[0m")
		logOutput(exec('appc login --username $APPC_USERNAME --password $APPC_PASSWORD', 120000));

		console.log("\033[1mInstalling App:\033[0m")
		logOutput(exec('appc install', 120000));

	});

	function logOutput(status) {
		if (status.stderr) {
			console.error(status.stderr);
		} else {
			console.log(status.stdout);
		}
	}
}
