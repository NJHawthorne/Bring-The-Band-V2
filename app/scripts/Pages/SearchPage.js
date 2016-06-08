import React from 'react';
import Navigation from './../Subcomponents/Navigation.js';

export default React.createClass({
	render: function() {
		return (
			<section>
				<Navigation />
				<div>Search for things!</div>
			</section>
		);
	}
});