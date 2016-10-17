import React from 'react';
import $ from 'jquery';
import Navigation from './../Subcomponents/Navigation.js';
import IndividualBand from './../Subcomponents/individualBand.js';
import votedBands from './../Collections/VotedBandsCollection.js';

export default React.createClass({
	getInitialState: function() {
		return {
			votedBands: votedBands,
			searchResults: []
		}
	},
	componentDidMount: function() {
		this.state.votedBands.on('update change', () => {
			this.setState({votedBands: this.state.votedBands})
		});
		votedBands.fetch();
	},
	componentWillUnmount: function() {
		this.state.votedBands.off('update change');
	},
	render: function() {
		let results = this.state.searchResults.map((val, i, arr) => {
			if(val.images.length === 0) {
				console.log('There is no image here');
				val.images.push({url: 'http://www.backfortybluegrasspark.com/images/SorryNoBandPictureAvailable.gif'});
			}
			return (
				<IndividualBand
					key={i}
					bandName={val.name}
					thumbnail={val.images[0].url} 
					upvote={this.handleNewBand} />
			);
		});
		return (
			<section className='searchPage'>
				<Navigation />
				<div>
					<h2>Search for things!</h2>
					<form
						onSubmit={this.handleSearch}>
						<input
							type='text'
							placeholder='Band name...'
							ref='searchedBand' />
						<input
							type='submit' />
					</form>
				</div>
				<section className='results'>
					{results}
				</section>
			</section>
		);
	},
	handleSearch: function(e) {
		e.preventDefault();
		let searchedBand = this.refs.searchedBand.value;
		this.searchRequest = $.get("https://api.spotify.com/v1/search?q="+searchedBand+"*&type=artist", function(bandData) {
			this.setState({
				searchResults: bandData.artists.items
			});
		}.bind(this));
	},
	handleNewBand: function(bandName, thumbnail) {
		let existingBand = false;
		let bandList = this.state.votedBands.map((val, i) => {
			return {
					artist: val.get('artist'),
					thumbnail: val.get('thumbnail'),
					id: val.get('_id')
				};
		});
		bandList.forEach((val, i) => {
			if(val.artist === bandName) {
				let updatedBand = this.state.votedBands.get(val.id);
				updatedBand.save({
					votes: updatedBand.get('votes') + 1
				});
				existingBand = true;
			}
		});
		if(!existingBand) {
			this.state.votedBands.create({
				artist: bandName,
				thumbnail: thumbnail,
				votes: 1
			});
		}
	}
});