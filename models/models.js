const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
});

const blogSchema = new mongoose.Schema({
	author: String,
	title: String,
	body: String,
	authorid: String,
});

const blog = mongoose.model("blog", blogSchema);

const user = mongoose.model("user", userSchema);

module.exports = { user, blog };
