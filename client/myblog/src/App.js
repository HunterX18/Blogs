import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Navbar from "./Navbar";
import EachBLog from "./pages/EachBlog";
import Edit from "./pages/Edit";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { UserProvider } from "./UserContext";
import Profile from "./pages/Profile";

function App() {
	return (
		<UserProvider>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/create">
						<Create />
					</Route>
					<Route exact path="/Eachblog/:id">
						<EachBLog />
					</Route>
					<Route exact path="/Edit/:id">
						<Edit />
					</Route>
					<Route exact path="/Signup">
						<Signup />
					</Route>
					<Route exact path="/Signin">
						<Signin />
					</Route>
					<Route exact path="/Profile/:author">
						<Profile />
					</Route>
				</Switch>
			</Router>
		</UserProvider>
	);
}

export default App;
