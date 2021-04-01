const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	author: String,
	blogs: [
		{
			title: String,
			body: String,
		},
	],
});

const user = mongoose.model("user", userSchema);

module.exports = user;

