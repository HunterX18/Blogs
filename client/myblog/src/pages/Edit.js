import { useState } from "react";
import { Redirect, useParams } from "react-router";
const Edit = () => {
	// const [author, setAuthor] = useState("");
	const author = localStorage.getItem("username");
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [edited, setEdited] = useState(false);
	const { id } = useParams();

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(author, title, body);
		fetch(`/edit/${id}`, {
			method: "put",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, author, body }),
		})
			.then((res) => res.json())
			.then((result) => {
				setEdited(true);
			})
			.catch((err) => console.log(err));
	};
	if (edited) return <Redirect to="/" />;

	return (
		<>
			<form>
				{/* <input
					name="author"
					placeholder="Author's name"
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
				/> */}
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

export default Edit;
