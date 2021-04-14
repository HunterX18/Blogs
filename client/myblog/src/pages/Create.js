import { useState, useEffect } from "react";
import { Redirect } from "react-router";
const Create = () => {
	// const [author, setAuthor] = useState("");
	const author = localStorage.getItem("username");
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [error, setError] = useState(false);
	const [created, setCreated] = useState(false);
	const token = localStorage.getItem("usertoken");
	const userid = localStorage.getItem("userid");

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch("/createBlog", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({
				author,
				title,
				body,
				authorid: userid,
			}),
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				if (result.error) setError(true);
				else setCreated(true);
			})
			.catch((err) => console.log(err));
	};

	if (error || token == null) return <Redirect to="/Signup" />;
	if (created) return <Redirect to="/" />;
	return (
		<>
			<h1>This is the Create Page!</h1>
			<form>
				<input
					name="title"
					placeholder="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<input
					name="body"
					placeholder="body"
					value={body}
					onChange={(e) => setBody(e.target.value)}
				/>
				<button type="submit" onClick={handleSubmit}>
					Submit
				</button>
			</form>
		</>
	);
};

export default Create;
