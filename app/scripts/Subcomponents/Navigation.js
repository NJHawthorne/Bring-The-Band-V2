import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
	render: function() {
		return (
			<nav>
				<Link to="/">Home Page</Link>
				<Link to="/search">Search Page</Link>
				<Link to="/results">Results Page</Link>
			</nav>
		);
	}
})