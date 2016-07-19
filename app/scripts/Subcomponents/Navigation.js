import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
	render: function() {
		return (
			<nav>
				<Link to="/">Bring the Band!</Link>
				<Link to="/search">Find your artist!</Link>
				<Link to="/results">See who's going!</Link>
			</nav>
		);
	}
})