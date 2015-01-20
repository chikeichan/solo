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
			pw: '1234',
			type: 'Fine Dining',
			averageWaitTime: 90
		},
		{
			id:2,
			name: 'Cafe Des Amis',
			type: 'Casual Dining',
			pw: '1234',
			averageWaitTime: 15
		},
		{
			id:3,
			name: 'Anchor Oyster Bar',
			type: 'Casual Dining',
			pw: '1234',
			averageWaitTime: 75
		},
		{
			id:4,
			name: 'Gary Danko',
			type: 'Fine Dining',
			pw: '1234',
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

	app.post('/api/waitlists',function(req,res, next){
		var waitlist = req.body;
		var error = false;
		waitlistdb.push(waitlist);
		res.send()
	});

	app.post('/api/users/signup',function(req,res, next){
		var user = req.body;
		var error = false;
		userdb.forEach(function(extuser){
			if(extuser.username === user.username){
				next(new Error('User Already Exist!'));
				res.send('/');
				error = true;
			}
		})
		if(!error){
			userdb.push(user)
			var token = jwt.encode(user,'secret');
			res.json({token: token});
			res.send();
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

	app.post('/api/restaurants/signup',function(req,res, next){
		var restaurant = req.body;
		var error = false;
		restaurantdb.forEach(function(extrestaurant){
			if(extrestaurant.name === restaurant.name){
				next(new Error('Restaurant Already Exist!'));
				error = true;
				res.send('/');
			}
		})
		if(!error){
			restaurantdb.push(restaurant)
			console.log(restaurant);
			var token = jwt.encode(restaurant,'secret');
			res.json({token: token});
			res.send('/');
		}
	});

	app.post('/api/restaurants/signin',function(req,res,next){
		var restaurant = req.body.name;
		var password = req.body.password;
		console.log(restaurant,password);

		var error = true;
		restaurantdb.forEach(function(exrestaurant){
			if(exrestaurant.name === restaurant){
				console.log(exrestaurant);
				if(exrestaurant.pw === password){
					var token = jwt.encode(restaurant,'secret');
					res.json({token: token});
					error = false;
					res.send('/');
				}
			}
		})
		if(error){
			res.error();
			res.send();
		}
	})

}