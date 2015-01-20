var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://test:test@ds027758.mongolab.com:27758/waitly');
var Schema = mongoose.Schema;





UserSchema = new Schema({
	username: {type: String, lowercase: true, unique: true},
	password: String
});

WaitlistSchema = new Schema({
	restaurant: String,
	user: String,
	partySize: Number,
	time: {type: Date, default: Date.now},
	status: {type: String, default: 'waiting'}
});

RestaurantSchema = new Schema({
	name: String,
	type: String,
	password: String,
	averageWaitTime: Number
});;

module.exports.User = mongoose.model('User',UserSchema);
module.exports.Waitlist = mongoose.model('Waitlist',WaitlistSchema);
module.exports.Restaurant = mongoose.model('Restaurant',RestaurantSchema);