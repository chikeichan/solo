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

module.exports = function(app) {
	app.use(express.static(__dirname+'/../client/'));
	app.get('/api/restaurants',function(req,res,next){
		Restaurant.find({},function(err,d){
			res.send(d);
		})
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
		Restaurant.findOne({name:req.body.name},function(err,restaurant){
			if(err){
				res.error(err);
			} else {
				console.log(restaurant);
				if(!restaurant){
					bcrypt.genSalt(10,function(err,salt){
						bcrypt.hash(req.body.password, salt, function(err,hash){
							var name = req.body.name;
							var password = hash;
							var newRest = new Restaurant({
								name: name,
								password: password,
								type: req.body.type,
								averageWaitTime: 30
							});

							newRest.save();
							res.send('/');
						})
					})
				} else {
					next(new Error('Restaurant Exist'));
				}
			}
		})
	});

	app.post('/api/restaurants/signin',function(req,res,next){
		var name = req.body.name;
		var password = req.body.password;

		Restaurant.findOne({name:name},function(err,restaurant){
			if(err){
				next(new Error(err));
			} else {
				if(!restaurant){
					next(new Error('No Restaurant Exist!'));
				} else {
					bcrypt.compare(password,restaurant.password, function(err,match){
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

}