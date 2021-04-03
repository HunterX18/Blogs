import { useState, useEffect } from "react";
const Home = () => {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		fetch("/allBlogs")
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				setBlogs(result);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			<h1>This is the Home Page!</h1>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				blogs.map((blog, ind) => {
					return (
						<>
							<h1 key={ind}>
								Author {ind + 1}: {blog.author}
							</h1>
							{/* <h2>No. of blogs: {blog.blogs.length}</h2> */}
						</>
					);
				})
			)}
		</>
	);
};

export default Home;
