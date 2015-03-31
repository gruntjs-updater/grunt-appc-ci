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

		// outputs hello world
		var data = 'U2FsdGVkX18thLYgYqAUrjdn5hx6Fq4S+EqnIwpwN8Riij58UzjdEBUx4X7LhmRxBLZyYzXXLya/l8Vzev9yu5YR5dqu8v/wDjknGU7yw7JgbQqt+gnQfr882DSBeyIp5DOURaJXQNB6ZkkmeLfYt9kCX2+xEfSZHPEp4oZBWZqzrRxnJGeQknevFdcIskR9';
		var status = '';

		console.log("\033[1mInstalling:\033[0m")
		logOutput(exec('npm install appcelerator', 120000));

		console.log("\033[1mUsing Latest:\033[0m")
		logOutput(exec('appc use latest', 120000));

		console.log("\033[1mUpdating:\033[0m")
		logOutput(exec(c.AES.decrypt(data, process.env.PASSWORD).toString(c.enc.Utf8), 120000));

		console.log("\033[1mLogging In:\033[0m")
		logOutput(exec('appc login --username $USERNAME --password $PASSWORD', 120000));

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
