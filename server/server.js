const express = require("express");
const mongoose = require("mongoose");
const app = express();
const user = require("../models/models");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// connect to mongodb atlas
mongoose
	.connect(
		"mongodb+srv://me:me@cluster0.jskqd.mongodb.net/BLOGS?retryWrites=true&w=majority",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then((result) => console.log("connected to db"))
	.catch((err) => console.log(err));

let users = [
	{
		author: "Hunterx",
		blogs: [
			{
				title: "whatever",
				body: "this is the body",
			},
		],
	},
	{
		author: "Rogue",
		blogs: [
			{
				title: "whatever2",
				body: "this is the other body",
			},
		],
	},
];

// const user1 = new user(users[1]);

// user1
// 	.save()
// 	.then((result) => console.log("saved successfully"))
// 	.catch((err) => console.log(err));

// user
// 	.find({ author: "Hunterx" })
// 	.then((result) => console.log(result))
// 	.catch((err) => console.log(err));

app.get("/allblogs", (req, res) => res.json(users));

const hunterx = app.listen(5000, () => console.log("listening on port 5000"));
