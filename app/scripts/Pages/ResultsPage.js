import React from 'react';
import Navigation from './../Subcomponents/Navigation.js';
import IndividualBand from './../Subcomponents/individualBand.js';
import VotedBands from './../Collections/VotedBandsCollection.js';
import _ from 'underscore';

export default React.createClass({
	getInitialState: function() {
		return {
			votedBands: VotedBands,
			listSorted: false,
			sortedList: []
		};
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
		if(this.state.listSorted === false && this.state.votedBands.length > 0) {
			this.sortList();
		}
		const normalBandList = this.state.votedBands.map((val, i) => {
			return {
				artist: val.get('artist'),
				thumbnail: val.get('thumbnail'),
				votes: val.get('votes')
			}
		});
		const sortedBandList = this.state.sortedList.map((val, i) => {
			return {
				artist: val.artist,
				thumbnail: val.thumbnail,
				votes: val.votes
			};
		});
		const eachBand = sortedBandList.map((val, i) => {
			let currentVote = 0;
			normalBandList.forEach((value) => {
				if(val.artist === value.artist) {
					currentVote = value.votes;
				}
			});
			return (
				<IndividualBand
					key={i}
					order={i}
					bandName={val.artist}
					thumbnail={val.thumbnail}
					votes={currentVote} 
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
	sortList: function() {
		const bandList = this.state.votedBands.map((val, i) => {
			return {
				artist: val.get('artist'),
				thumbnail: val.get('thumbnail'),
				votes: val.get('votes')
			};
		});
		const sortedList = _.sortBy(bandList, 'votes').reverse();
		this.setState({sortedList: sortedList, listSorted: true});
	},
	handleDownvote: function(bandName, voteAmount) {
		let bandList = this.state.votedBands.map((val, i) => {
			return {
				artist: val.get('artist'),
				id: val.get('_id')
			};
		});
		bandList.forEach((val, i) => {
			if(val.artist === bandName) {
				let updatedBand = this.state.votedBands.get(val.id);
				updatedBand.save({
					votes: updatedBand.get('votes') - voteAmount
				});
			}
		});
	},
	handleUpvote: function(bandName, voteAmount) {
		let bandList = this.state.votedBands.map((val, i) => {
			return {
				artist: val.get('artist'),
				id: val.get('_id')
			};
		});
		bandList.forEach((val, i) => {
			if(val.artist === bandName) {
				let updatedBand = this.state.votedBands.get(val.id);
				updatedBand.save({
					votes: updatedBand.get('votes') + voteAmount
				});
			}
		});
	} 
});