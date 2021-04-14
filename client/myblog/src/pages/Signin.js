import { useState } from "react";
import { Link, Redirect } from "react-router-dom";

const Signin = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [signedin, setSignedin] = useState(false);
	const [incorrectPassword, setIncorrectPassword] = useState(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		fetch("/signin", {
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
				// console.log(result);
				if (result.mssg == "incorrect password") setIncorrectPassword(true);
				else {
					localStorage.setItem("usertoken", result.token);
					localStorage.setItem("username", result.username);
					localStorage.setItem("userid", result.id);
					setSignedin(true);
					setIncorrectPassword(false);
				}
				setUsername("");
				setPassword("");
			})
			.catch((err) => console.log(err));
	};
	if (signedin) return <Redirect to="/" />;
	return (
		<>
			<h1>This is the Signin Page!</h1>
			<Link to="/Signup">
				<h1>SignUP</h1>
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
			{incorrectPassword && <h1>Incorrect Password</h1>}
		</>
	);
};

export default Signin;
