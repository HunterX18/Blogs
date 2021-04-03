import { useState, useEffect } from "react";
const Create = () => {
	const [author, setAuthor] = useState("");
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(author, title, body);
		fetch("/createBlog", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				author,
				title,
				body,
			}),
		})
			.then((res) => res.json())
			.then((result) => console.log(result))
			.catch((err) => console.log(err));
	};
	return (
		<>
			<h1>This is the Create Page!</h1>
			<form>
				<input
					name="author"
					placeholder="Author's name"
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
				/>
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
