#!/usr/bin/env node --harmony
'use strict';

const 
	async  = require('async'),
	request = require('request'),
	views = require('./lib/views.js');

async.waterfall([
	//get existing desing doc, if exists
	function(next) {
		console.log('getting views');
		request.get('http://localhost:5984/books/_design/books', next);
	},

	//create a new view or use existing one
	function(res, body, next) {
		console.log(res.statusCode);
		if (res.statusCode === 200) {
			next(null, JSON.parse(body));
		} else if (res.statusCode === 404) {
			next(null, {views: {} });
		}
	},

	//add views to document and submit
	function(doc, next) {
		Object.keys(views).forEach(function(name) {
			doc.views[name] = views[name];
		});
		request({
			method: 'PUT',
			url: 'http://localhost:5984/books/_design/books',
			json: doc
		}, next);
	}
	], function(err, res, body) {
		if (err) {
			throw err;
		} 
		console.log(res.statusCode, body);
	});	
