import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
const Home = () => {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(false);
	const token = localStorage.getItem("usertoken");
	const [error, setError] = useState(false);
	useEffect(() => {
		setLoading(true);
		fetch("/allBlogs", {
			method: "post",
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then((res) => res.json())
			.then((result) => {
				if (result.error) setError(true);
				setBlogs(result);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	if (error) return <Redirect to="/Signup" />;
	return (
		<>
			<h1>This is the Home Page!</h1>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				blogs.map((blog, ind) => {
					return (
						<>
							<Link to={`/Eachblog/${blog._id}`}>
								<h1 key={ind}>
									Blog {ind + 1}: {blog.title}
								</h1>
							</Link>
						</>
					);
				})
			)}
		</>
	);
};

export default Home;
