var express = require('express');

module.exports = function(app) {
	app.use(express.static(__dirname+'/../client/'));

	app.post('/api/users/signup',function(req,res){
		console.log(req.body)
	})
}