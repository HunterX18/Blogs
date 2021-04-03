const express = require("express");
const mongoose = require("mongoose");
const app = express();
const {blog,user} = require("../models/models");

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

app.post("/createBlog", (req, res) => {
	// console.log(req.body);
	const author=req.body.author;
	const title=req.body.title;
	const newBlog = new blog(req.body);
	newBlog
		.save()
		.then((result) => res.json({ mssg: "saved successfully" }))
		.catch((err) => console.log(err));
	
});

app.get("/allBlogs", (req, res) => {
	blog
		.find()
		.then((result) => res.json(result))
		.catch((err) => console.log(err));
	
});

app.put('/editblog', (req,res)=>{

})

app.listen(5000, () => console.log("listening on port 5000"));
