var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017');
var Schema = mongoose.Schema;





UserSchema = new Schema({
	username: {type: String, lowercase: true, unique: true},
	password: String
});

WaitlistSchema = new Schema({
	restaurant: String,
	User: String,
	partySize: Number,
	time: {type: Date, default: Date.now},
	status: String
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