import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
const Navbar = () => {
	const [state, setState] = useContext(UserContext);

	useEffect(()=>{},[state])

	const handleLogout = () => {
		localStorage.removeItem("username");
		localStorage.removeItem("usertoken");
		localStorage.removeItem("userid");
		setState(null);
	};
	return (
		<>
			{state !== null && (
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
