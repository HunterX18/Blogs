import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const EachBlog = () => {
	const [author, setAuthor] = useState("");
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [authorid, setAuthorid] = useState("");

	const [loading, setLoading] = useState(false);
	const userid = localStorage.getItem("userid");
	const { id } = useParams();
	useEffect(() => {
		setLoading(true);
		fetch(`/eachblog/${id}`)
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				setAuthor(result.author);
				setTitle(result.title);
				setBody(result.body);
				setAuthorid(result.authorid);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			<h1>This is blog page!</h1>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<>
					<h1>{title}</h1>
					<h1>{author}</h1>
					<h1>{body}</h1>
					{authorid == userid && (
						<Link to={`/Edit/${id}`}>
							<button>Edit Blog</button>
						</Link>
					)}
				</>
			)}
		</>
	);
};

export default EachBlog;
