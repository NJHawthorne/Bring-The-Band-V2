import React from 'react';
import Navigation from './../Subcomponents/Navigation.js';
import IndividualBand from './../Subcomponents/individualBand.js';
import VotedBands from './../Collections/VotedBandsCollection.js';
import _ from 'underscore';

export default React.createClass({
	getInitialState: function() {
		return {votedBands: VotedBands};
	},
	componentDidMount: function() {
		this.state.votedBands.on('update change', () => {
			this.setState({votedBands: this.state.votedBands})
		});
		this.state.votedBands.fetch();
	},
	componentWillUnmount: function() {
		this.state.votedBands.off('update change');
	},
	render: function() {
		let bandList = this.state.votedBands.map((val, i) => {
			return {
				artist: val.get('artist'),
				thumbnail: val.get('thumbnail'),
				votes: val.get('votes')
			};
		});
		let sortedList = _.sortBy(bandList, 'votes').reverse();
		const eachBand = sortedList.map((val, i) => {
			return (
				<IndividualBand
					key={i}
					bandName={val.artist}
					thumbnail={val.thumbnail}
					votes={val.votes} 
					upvote={this.handleUpvote}
					downvote={this.handleDownvote} />
			)
		});
		return (
			<section>
				<Navigation />
				<div>Check out the Results!</div>
				{eachBand}
			</section>
		);
	},
	handleDownvote: function(bandName, thumbnail) {
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
					votes: updatedBand.get('votes') - 1
				});
			}
		});
	},
	handleUpvote: function(bandName, thumbnail) {
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
			}
		});
	} 
});