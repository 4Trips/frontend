import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import LogIn from "./views/Login.js";
import { Single } from "./views/single";
import injectContext from "./store/appContext";

import { Footer } from "./component/footer.jsx";
import Menu from "./component/navbar.jsx";
import registerTraveler from "./views/registroViajero.jsx";
import registerTravelerNo from "./views/RegistroViajeroNo.jsx";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column">
			<BrowserRouter basename={basename}>
				<Menu />
				<ScrollToTop>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/registroviajero" component={registerTraveler} />
						<Route exact path="/registroviajeroNo" component={registerTravelerNo} />

						<Route exact path="/single/:theid">
							<Single />
						</Route>
						<Route exact path="/login">
							<LogIn></LogIn>
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
