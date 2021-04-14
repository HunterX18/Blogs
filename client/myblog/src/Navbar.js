import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	const token = localStorage.getItem("username");
	const handleLogout = () => {
		localStorage.removeItem("username");
		localStorage.removeItem("usertoken");
		localStorage.removeItem("userid");
	};
	return (
		<>
			{token !== null && (
				<>
					<Link to="/">
						<h3>Home</h3>
					</Link>
					<Link to="/Create">
						<h3>Create</h3>
					</Link>
					<Link to="/Signin">
						<button onClick={handleLogout}>Logout</button>
					</Link>
				</>
			)}
		</>
	);
};

export default Navbar;
