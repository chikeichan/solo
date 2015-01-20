var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');
var jwt = require('jwt-simple');
var User = require('./db.js').User;
var Waitlist = require('./db.js').Waitlist;
var Restaurant = require('./db.js').Restaurant;

	// 	restaurant: String,
	// User: String,
	// partySize: Number,
	// time: {type: Date, default: Date.now},
	// status: String

module.exports = function(app) {
	app.use(express.static(__dirname+'/../client/'));
	app.get('/api/restaurants',function(req,res,next){
		Restaurant.find({},function(err,d){
			res.send(d);
		})
	})

	app.get('/api/waitlists',function(req,res,next){
		Waitlist.find({},function(err,d){
			res.send(d);
		})
	})

	app.put('/api/waitlists/:id',function(req,res,next){
		Waitlist.findOne({_id: req.params.id},function(err,d){
			d.status = req.body.status;
			d.save();
			res.send();
		})
	})

	app.post('/api/waitlists',function(req,res, next){
		var newWaitlist = new Waitlist(req.body);
		newWaitlist.save();
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
							res.send();
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
							res.send();
						} else {
							var token = jwt.encode(req.body,'secret');
							res.json({token: token});
							res.send();
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
							res.send();
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
							res.send();
						} else {
							var token = jwt.encode(req.body,'secret');
							res.json({token: token});
							res.send();
						}
					})
				}
			}
		})
	})

}
