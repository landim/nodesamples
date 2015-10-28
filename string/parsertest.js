"use strict";

var assert = require('assert');
var parser = require('./parser.js');

describe('Parser', function() {
	it('All properties', function() {
		var text = "This is a string with {{ ab49fd20.key_1 }}, including {{ 9822df87.another_key }}.";
		var object = {
		  'ab49fd20': {
		    key_1: 'some data'
		  },
		  '9822df87': {
		    another_key: 'big data',
		    yet_another_key: 'small data'
		  }
		};

		var result = parser(text, object);
		assert.equal('This is a string with some data, including big data.',
			result);
	});

	it('Missing properties', function() {
		var text = "This is a string with {{ ab49fd20.key_1 }}, including {{ 9822df87.another_key }} and also {{ ab49fd20.key_2 }}.";
		var object = {
		  'ab49fd20': {
		    key_1: 'some data'
		  },
		  '9822df87': {
		    another_key: 'big data',
		    yet_another_key: 'small data'
		  }
		};

		var result = parser(text, object);
		assert.equal('This is a string with some data, including big data and also <nothing>.',
			result);
	});

	it('Missing object', function() {
		var text = "This is a string with {{ ab49fd20.key_1 }}, including {{ 9822df88.another_key }} and also {{ ab49fd20.key_2 }}.";
		var object = {
		  'ab49fd20': {
		    key_1: 'some data'
		  },
		  '9822df87': {
		    another_key: 'big data',
		    yet_another_key: 'small data'
		  }
		};

		var result = parser(text, object);
		assert.equal('This is a string with some data, including <nothing> and also <nothing>.',
			result);
	});
});
