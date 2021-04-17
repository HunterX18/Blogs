import { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../UserContext";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [signedin, setSignedin] = useState(false);
	const [state, setState] = useContext(UserContext);
	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(username, password);
		fetch("/signup", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
			}),
		})
			.then((res) => res.json())
			.then((result) => {
				localStorage.setItem("username", result.username);
				setState(localStorage.getItem("username"));
				localStorage.setItem("usertoken", result.token);
				localStorage.setItem("userid", result.id);
				setSignedin(true);
			})
			.catch((err) => console.log(err));
	};
	if (signedin) return <Redirect to="/" />;
	return (
		<>
			<h1>This is the Signup Page!</h1>
			<Link to="/Signin">
				<h1>SignIn</h1>
			</Link>
			<form onSubmit={(e) => handleSubmit(e)}>
				<input
					type="text"
					placeholder="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="text"
					placeholder="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
		</>
	);
};

export default Signup;
