import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Myblogs from "./pages/Myblogs";
import Navbar from "./Navbar"

function App() {
	return (
    <Router>
		<Navbar />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/create">
					<Create />
				</Route>
				<Route exact path="/myblogs">
					<Myblogs />
				</Route>
			</Switch>
    </Router>
        
	);
}

export default App;
