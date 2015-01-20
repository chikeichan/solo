var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017');
var Schema = mongoose.Schema;





UserSchema = new Schema({
	userID: Schema.ObjectId,
	username: String,
	password: String
});

WaitlistSchema = new Schema({
	waitlistID: Schema.ObjectId,
	restaurantID: Number,
	userID: Number,
	partySize: Number,
	time: {type: Date, default: Date.now}
});

RestaurantSchema = new Schema({
	restaurantID: Schema.ObjectId,
	name: String,
	type: String,
	password: String,
	averageWaitTime: Number
});;

module.exports.User = mongoose.model('User',UserSchema);
module.exports.Waitlist = mongoose.model('Waitlist',WaitlistSchema);
module.exports.Restaurant = mongoose.model('Restaurant',RestaurantSchema);