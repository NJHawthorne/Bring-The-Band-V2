// import the stylesheet. this is necessary so that webpack will compile all the sass into css and then build it into our style.css file
import './../styles/main.scss';

// import a module from another file.
import HomePage from './Pages/HomePage.js';
import SearchPage from './Pages/SearchPage.js';
import ResultsPage from './Pages/ResultsPage.js';
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

const router = (
	<Router history={hashHistory}>
		<Route path="/" component={HomePage} />
		<Route path="/search" component={SearchPage} />
		<Route path="/results" component={ResultsPage} />
	</Router>
);

render(
	router,
	document.getElementById('app')
);