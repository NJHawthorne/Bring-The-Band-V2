import React from 'react';

const IndividualBand = React.createClass({
	render: function() {
		if(!this.props.downvote) {
			return (
				<div
					key={this.props.key}>
					<p>{this.props.bandName}</p>
					<img src={this.props.thumbnail} />
					<button
						onClick={this.handleUpvote} >Vote!
					</button>
				</div>
			);
		} else {
			return (
				<div
					key={this.props.key}>
					<p>{this.props.bandName}: {this.props.votes}</p>
					<img src={this.props.thumbnail} />
					<button
						onClick={this.handleUpvote} >Upvote!
					</button>
					<button
						onClick={this.handleDownvote} >Downvote!
					</button>
				</div>
			);
		}
	},
	handleUpvote: function() {
		this.props.upvote(this.props.bandName, this.props.thumbnail);
	},
	handleDownvote: function() {
		this.props.downvote(this.props.bandName, this.props.thumbnail);
	}
});

export default IndividualBand;