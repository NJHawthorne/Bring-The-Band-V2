import React from 'react';
import $ from 'jquery';
import Navigation from './../Subcomponents/Navigation.js';
import votedBands from './../Collections/VotedBandsCollection.js';

export default React.createClass({
	getInitialState: function() {
		console.log('getInitialState');
		return {
			votedBands: votedBands,
			searchResults: []
		}
	},
	componentDidMount: function() {
		console.log('componentDidMount');
		this.state.votedBands.on('update change', () => {
			this.setState({votedBands: this.state.votedBands})
		});
		votedBands.fetch();
	},
	componentWillUnmount: function() {
		console.log('componentWillUnmount');
		this.state.votedBands.off('update change');
	},
	render: function() {
		console.log('render');
		console.log(this.state.searchResults);
		return (
			<section>
				<Navigation />
				<div>Search for things!</div>
				<form
					onSubmit={this.handleSearch}>
					<input
						type='text'
						placeholder='Band name...'
						ref='searchedBand' />
					<input
						type='submit' />
				</form>
			</section>
		);
	},
	handleSearch: function(e) {
		e.preventDefault();
		console.log(this.refs.searchedBand.value);
		let searchedBand = this.refs.searchedBand.value;
		this.searchRequest = $.get("https://api.spotify.com/v1/search?q="+searchedBand+"*&type=artist", function(bandData) {
			this.setState({
				searchResults: bandData.artists.items
			});
		}.bind(this));
	}
});