var express = require('express');
var bcrypt = require('bcrypt');
var Q = require('q');
var jwt = require('jwt-simple');

var userdb = [];




module.exports = function(app) {
	app.use(express.static(__dirname+'/../client/'));

	app.post('/api/users/signup',function(req,res, next){
		var user = req.body;
		var error = false;
		userdb.forEach(function(user){
			if(user){
				next(new Error('User Already Exist!'));
				res.send('/');
				error = true;
			}
		})
		if(!error){
			userdb.push(user)
			var token = jwt.encode(user,'secret');
			res.json({token: token});
		}
	});

	app.post('/api/users/signin',function(req,res,next){
		var username = req.body.username;
		var password = req.body.password;

		var error = true;
		userdb.forEach(function(user){
			if(user.username === username){
				if(user.password === password){
					var token = jwt.encode(user,'secret');
					res.json({token: token});
					res.send('/');
					error = false;
				}
			}
		})

		if(error){
			res.error();
			res.send();
		}

	})

}