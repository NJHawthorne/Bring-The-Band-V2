import Backbone from 'backbone';
import VotedBandsModel from './../Models/VotedBandsModel.js';

const VotedBandsCollection = Backbone.Collections.extend({
	model: VotedBandsModel,
	url: 'http://tiny-za-server.herokuapp.com/collections/nate-hawthorne'
});

const votedBands = new VotedBandsCollection;

export default votedBands;