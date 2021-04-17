// import { useState } from "react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Profile = () => {
	// const [profileName, setProfilenName] = useState("");
	const { author } = useParams();
	const [state, dispatch] = useContext(UserContext);
	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		fetch(`/profile/${author}`)
			.then((res) => res.json())
			.then((result) => setBlogs(result))
			.catch((err) => console.log(err));
	}, []);

	const handleFollow = () => {
		fetch("/follow", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				follower: state,
				following: author,
			}),
		})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	return (
		<>
			<h1>This is the Profile Page of {author}</h1>
			{state !== author && <button onClick={handleFollow}>Follow</button>}
			{blogs.map((blog, ind) => (
				<Link to={`/Eachblog/${blog._id}`}>
					<h2 key={ind}>{blog.title}</h2>
				</Link>
			))}
		</>
	);
};

export default Profile;
