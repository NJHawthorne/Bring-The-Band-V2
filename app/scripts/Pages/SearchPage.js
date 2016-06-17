import React from 'react';
import Navigation from './../Subcomponents/Navigation.js';
import votedBands from './../Collections/VotedBandsCollection.js';

export default React.createClass({
	getInitialState: function() {
		console.log('getInitialState');
		return {
			votedBands: votedBands
		}
	},
	componentDidMount: function() {
		console.log('componentWillMount');
		this.state.votedBands.on('update change', () => {
			this.setState({votedBands: this.state.votedBands})
		});
		votedBands.fetch();

	},
	componentWillUnmount: function() {
		this.state.votedBands.off('update change');
	},
	render: function() {
		console.log('render');
		return (
			<section>
				<Navigation />
				<div>Search for things!</div>
			</section>
		);
	}
});