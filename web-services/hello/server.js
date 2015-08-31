#!/usr/bin/env node --harmony
'use strict';

var	express = require('express');
var bodyParser = require('body-parser');
var	app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//app.use(express.logger('dev'));
app.get('/api/:name', function(req, res) {
	console.log("api called with parameter " + req.params.name);
	res.status(200).json({ "hello": req.params.name});
});

app.post('/api', function(req, res) {
	var name = req.body.name;
	console.log("POST api called with parameter " + name);
	res.status(200).json({ "POST: hello": name});
});

app.listen(3000, function() {
	console.log('Ready');
});