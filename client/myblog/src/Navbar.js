import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<>
			<Link to="/">
				<h3>Home</h3>
			</Link>
			<Link to="/Create">
				<h3>Create</h3>
			</Link>
		</>
	);
};

export default Navbar;
