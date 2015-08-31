'use strict';

process.env.NODE_ENV = 'test';
var request = require('request');
var assert = require('assert');
var app = require('./server.js');

describe('hello service', function() {
	before(function() {
		
	});

	it('should return NAME when request GET', function() {
		request('http://localhost:3000/api/NAME', function(err, response, body) {
			assert.equal('{"name":"NAME)"', body);
		});
	});

	after(function() {
		// app.close();
	})
})