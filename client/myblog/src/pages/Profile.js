// import { useState } from "react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Profile = () => {
	const { author } = useParams();
	const [state, dispatch] = useContext(UserContext);
	const [blogs, setBlogs] = useState([]);
	const [following, setFollowing]=useState(localStorage.getItem("following").split(","))
	console.log(following);
	useEffect(() => {
		fetch(`/profile/${author}`)
			.then((res) => res.json())
			.then((result) => setBlogs(result))
			.catch((err) => console.log(err));
	}, [following]);

	const handleFollow = () => {
		console.log(state, author);
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
			.then((res) => res.json())
			.then((result) => {
				localStorage.setItem("following", result.toString());
				setFollowing(result.toString());
			})
			.catch((err) => console.log(err));
	};

	const handleUnfollow = () => {
		console.log(state, author);
		fetch("/unfollow", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				follower: state,
				following: author,
			}),
		})
			.then((res) => res.json())
			.then((result) => {
				localStorage.setItem("following", result.toString());
				setFollowing(result.toString());
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<h1>This is the Profile Page of {author}</h1>
			{state !== author &&
				(following.includes(author) ? (
					<button onClick={handleUnfollow}>Unfollow</button>
				) : (
					<button onClick={handleFollow}>Follow</button>
				))}
			{blogs.map((blog, ind) => (
				<Link to={`/Eachblog/${blog._id}`}>
					<h2 key={ind}>{blog.title}</h2>
				</Link>
			))}
		</>
	);
};

export default Profile;
