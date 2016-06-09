import Backbone from 'backbone';

const VotedBandsModel = Backbone.Model.extend({
	defaults: {
		artist: '',
		thumbnail: '',
		votes: 0
	},
	rootUrl: 'http://tiny-za-server.herokuapp.com/collections/nate-hawthorne',
	idAttribute: '_id'
});

export default VotedBandsModel;