import React from 'react';
import $ from 'jquery';

const IndividualBand = React.createClass({
	render: function() {
		if(!this.props.downvote) {
			return (
				<div
					key={this.props.key}>
					<p>{this.props.bandName}</p>
					<img src={this.props.thumbnail} />
					<span
						onClick={this.handleUpvote} >Vote!
					</span>
				</div>
			);
		} else {
			return (
				<div
					key={this.props.key}>
					<p>{this.props.bandName}: {this.props.votes}</p>
					<img src={this.props.thumbnail} />
					<span
						onClick={this.handleUpvote} >Upvote!
					</span>
					<span
						onClick={this.handleDownvote} >Downvote!
					</span>
				</div>
			);
		}
	},
	handleUpvote: function(e) {
		let upvote = true;
		if(e.target.className === 'upVoted') {
			$(e.target).removeClass('upVoted');
			upvote = false;
		} else {
			$(e.target).addClass('upVoted');
			upvote = true;
		}
		if(upvote) {
			this.props.upvote(this.props.bandName);
		} else {
			this.props.downvote(this.props.bandName);
		}
	},
	handleDownvote: function(e) {
		let downvote = true;
		if(e.target.className === 'downVoted') {
			$(e.target).removeClass('downVoted');
			downvote = false;
		} else {
			$(e.target).addClass('downVoted');
			downvote = true;
		}
		if(downvote) {
			this.props.downvote(this.props.bandName);
		} else {
			this.props.upvote(this.props.bandName);
		}
	}
});

export default IndividualBand;