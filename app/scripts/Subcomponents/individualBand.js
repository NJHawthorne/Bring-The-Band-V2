import React from 'react';
import $ from 'jquery';

const IndividualBand = React.createClass({
	render: function() {
		let upvoteOrder = '';
		let downvoteOrder = '';
		if(this.props.order === 0) {
			upvoteOrder = 'upvote0';
			downvoteOrder = 'downvote0'
		}
		if(this.props.order) {
			upvoteOrder += 'upvote'+this.props.order.toString();
			downvoteOrder += 'downvote'+this.props.order.toString();
		}
		if(!this.props.downvote) {
			return (
				<div
					key={this.props.key}>
					<p>{this.props.bandName}</p>
					<img src={this.props.thumbnail} />
					<span
						onClick={this.handleNewBand} >Vote!
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
						id={upvoteOrder}
						onClick={this.handleUpvote} >Upvote!
					</span>
					<span
						id={downvoteOrder}
						onClick={this.handleDownvote} >Downvote!
					</span>
				</div>
			);
		}
	},
	handleUpvote: function(e) {
		let orderNumber = e.target.id.slice(6);
		if(e.target.className === 'upVoted') {
			$(e.target).removeClass('upVoted');
			this.props.downvote(this.props.bandName, 1);
		} else if($(`#downvote${orderNumber}`).hasClass('downVoted')) {
			$(`#downvote${orderNumber}`).removeClass('downVoted');
			$(e.target).addClass('upVoted');
			this.props.upvote(this.props.bandName, 2);
		} else {
			$(e.target).addClass('upVoted');
			this.props.upvote(this.props.bandName, 1);
		}
	},
	handleDownvote: function(e) {
		let orderNumber = e.target.id.slice(8);
		if(e.target.className === 'downVoted') {
			$(e.target).removeClass('downVoted');
			this.props.upvote(this.props.bandName, 1);
		} else if($(`#upvote${orderNumber}`).hasClass('upVoted')) {
			$(`#upvote${orderNumber}`).removeClass('upVoted');
			$(e.target).addClass('downVoted');
			this.props.downvote(this.props.bandName, 2);
		} else {
			$(e.target).addClass('downVoted');
			this.props.downvote(this.props.bandName, 1);
		}		
	},
	handleNewBand: function() {
		this.props.upvote(this.props.bandName, this.props.thumbnail);
	}
});

export default IndividualBand;