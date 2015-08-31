'use strict';

const request = require('request'),
	Q = require('q');

module.exports = function(config, app) {

	app.post('/api/bundle', function(req, res) {
		console.log('api/bundle called ' + req.query.name);
		let deferred = Q.defer();
		request.post( {
			url: config.b4db,
			json: {type:'bundle', name:req.query.name, books:{}}
		}, function(err, couchRes, body) {
			if(err) {
				deferred.reject(err);
			} else {
				deferred.resolve([couchRes, body]);
			}
		});

		deferred.promise.then(function(args) {
			console.log(args);
			let couchRes = args[0], body = args[1];
			console.log(body);
			res.status(200).json(body);
		}, function(err) {
			res.status(502).json({error: "bad gateway"});
		});
	});

	app.get('/api/bundle/:id', function(req, res) {
		Q.nfcall(request.get, config.b4db + '/' + req.params.id)
		.then(function(args){ 
			let couchRes = args[0], bundle = JSON.parse(args[1]);
			res.status(couchRes).json(bundle);
		}, function(err) {
			res.status(502).json({error: "bad gateway"});
		})
		.done();
	})

	app.put('/api/bundle/:id/name/:name', function(req, res) {
		console.log("PUT name");
		Q.nfcall(request.get, config.b4db + '/' + req.params.id)
		.then(function(args) {
			console.log(args.length);
			let couchRes = args[0].statusCode, bundle = JSON.parse(args[1]);
			console.log(couchRes);
			if (couchRes !== 200) {
				return [couchRes, bundle];
			}
			bundle.name = req.params.name;
			console.log(JSON.stringify(bundle));

			return Q.nfcall(request.put, {
				url: config.b4db+'/'+req.params.id,
				json: bundle
			});

		})
		.then(function(args) {
			let couchRes = args[0], body = args[1];
			res.status(couchRes).json(body);
		})
		.catch(function(err) {
			res.status(502).json({error: "bad gateway"});
		})
		.done();
	});
}