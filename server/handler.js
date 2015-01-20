var express = require('express');
var bcrypt = require('bcrypt');
var Q = require('q');
var jwt = require('jwt-simple');
var User = require('./db.js').User;
var Waitlist = require('./db.js').Waitlist;
var Restaurant = require('./db.js').Restaurant;


waitlistdb = [
		{
			waitlistID: 1,
			restaurantName: 'Spruce Cafe',
			name: 'Tony',
			size: 2,
			time: new Date()
		},
		{
			waitlistID: 2,
			restaurantName: 'Cafe Des Amis',
			name: 'Marcus',
			size: 5,
			time: new Date()
		},
		{
			waitlistID: 3,
			restaurantName: 'Anchor Oyster Bar',
			name: 'Fred',
			size: 4,
			time: new Date()
		},
		{
			waitlistID: 4,
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
		res.header(200);
	})

	app.get('/api/waitlists',function(req,res,next){
		res.send(waitlistdb);
		res.header(200);
	})

	app.post('/api/waitlists',function(req,res, next){
		var waitlist = req.body;
		waitlist.waitlistID = waitlistdb.length;
		var error = false;
		waitlistdb.push(waitlist);
		res.header(300);
		res.send();
	});

	app.post('/api/users/signup',function(req,res, next){
		User.findOne({username:req.body.username},function(err,user){
			if(err){
				res.error(err);
			} else {
				console.log(user);
				if(!user){
					bcrypt.genSalt(10,function(err,salt){
						bcrypt.hash(req.body.password, salt, function(err,hash){
							var username = req.body.username;
							var password = hash;
							var newUser = new User({
								username: username,
								password: password
							});

							newUser.save();
							res.send('/');
						})
					})
				} else {
					next(new Error('User Exist'));
				}
			}
		})
	});


	app.post('/api/users/signin',function(req,res,next){
		var username = req.body.username;
		var password = req.body.password;

		User.findOne({username:username},function(err,user){
			if(err){
				next(new Error(err));
			} else {
				if(!user){
					next(new Error('No User Exist!'));
				} else {
					bcrypt.compare(password,user.password, function(err,match){
						if(!match){
							res.send('/');
						} else {
							var token = jwt.encode(req.body,'secret');
							res.json({token: token});
						}
					})
				}
			}
		})

	})

	app.post('/api/restaurants/signup',function(req,res, next){
		var restaurant = req.body;
		restaurant.id = restaurantdb.length;
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