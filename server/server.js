const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
const { blog, user } = require("../models/models");

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

const userAuth = (req, res, next) => {
	const header = req.headers["authorization"];
	if (typeof header !== "undefined") {
		const token = header.split(" ")[1];
		req.token = token;
		next();
	} else res.redirect("/login");
};

app.post("/createBlog", userAuth, (req, res) => {
	// const author = req.body.author;
	// const title = req.body.title;
	// console.log(req.body);
	jwt.verify(req.token, "secretkey", (err, result) => {
		if (err) res.json({ error: "not verified" });
		else {
			const newBlog = new blog(req.body);
			newBlog
				.save()
				.then((result) => res.json({ mssg: "saved successfully" }))
				.catch((err) => console.log(err));
		}
	});
});

app.post("/allBlogs", userAuth, (req, res) => {
	jwt.verify(req.token, "secretkey", (err, result) => {
		if (err) res.json({ error: "not verified" });
		else {
			blog
				.find()
				.then((result) => res.json(result))
				.catch((err) => console.log(err));
		}
	});
});

app.put("/edit/:id", (req, res) => {
	const id = req.params.id;
	// console.log(typeof(id));
	const author = req.body.author;
	const title = req.body.title;
	const body = req.body.body;
	// console.log(author, title, body);
	blog
		.findOneAndUpdate({ _id: id }, { author, title, body }, { new: true })
		.then((result) => res.json({ mssg: "Updated successfully" }))
		.catch((err) => res.json({ error: err }));
});

app.get("/eachblog/:id", (req, res) => {
	const id = req.params.id;
	// res.json({"mssg":"found"})
	blog
		.findById(id)
		.then((result) => res.json(result))
		.catch((err) => console.log("error", err));
});

app.post("/signup", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	if (!username || !password) res.json({ error: "No username or password" });
	jwt.sign({ username, password }, "secretkey", (err, token) => {
		if (err) res.json({ username, password, err });
		else {
			const newUser = new user({ username, password });
			newUser
				.save()
				.then((result) => {
					res.json({
						mssg: "user created successfully",
						token,
						id: result._id,
						username,
					});
				})
				.catch((err) => console.log(err));
			// res.json({ username, password, token });
		}
	});
});

app.post("/signin", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	if (!username || !password) res.json({ error: "No username or password" });
	user
		.find({ username })
		.then((result) => {
			// res.json(result);
			if (result[0].username == null) res.json({ mssg: "user not found" });
			else {
				if (result[0].password == password) {
					// res.json({ mssg: "user found" });
					jwt.sign({ username, password }, "secretkey", (err, token) => {
						if (err) res.json({ username, err });
						else {
							res.json({ username, token, id: result[0]._id });
						}
					});
				} else res.json({ mssg: "incorrect password" });
			}
		})
		.catch((err) => res.json(err));
});

app.listen(5000, () => console.log("listening on port 5000"));
