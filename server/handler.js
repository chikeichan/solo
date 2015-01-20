var express = require('express');
var bcrypt = require('bcrypt');
var Q = require('q');
var jwt = require('jwt-simple');

var userdb = [{
	username: 'Jacky',
	password: '1234'
}];

waitlistdb = [
		{
			restaurantName: 'Spruce Cafe',
			name: 'Tony',
			size: 2,
			time: new Date()
		},
		{
			restaurantName: 'Cafe Des Amis',
			name: 'Marcus',
			size: 5,
			time: new Date()
		},
		{
			restaurantName: 'Anchor Oyster Bar',
			name: 'Fred',
			size: 4,
			time: new Date()
		},
		{
			restaurantName: 'Gary Danko',
			name: 'Shawn',
			size: 7,
			time: new Date()
		},
	];

var restaurantdb = [{
			id: 1,
			name: 'Spruce Cafe',
			type: 'Fine Dining',
			averageWaitTime: 90
		},
		{
			id:2,
			name: 'Cafe Des Amis',
			type: 'Casual Dining',
			averageWaitTime: 15
		},
		{
			id:3,
			name: 'Anchor Oyster Bar',
			type: 'Casual Dining',
			averageWaitTime: 75
		},
		{
			id:4,
			name: 'Gary Danko',
			type: 'Fine Dining',
			averageWaitTime: 120
		}];




module.exports = function(app) {
	app.use(express.static(__dirname+'/../client/'));

	app.get('/api/restaurants',function(req,res,next){
		res.send(restaurantdb);
	})

	app.get('/api/waitlists',function(req,res,next){
		res.send(waitlistdb);
	})

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