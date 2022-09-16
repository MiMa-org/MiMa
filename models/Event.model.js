const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const eventSchema = new Schema(
  {
    title: String,
    address: String,
    date: String,
    description: String,
    artists: String,
    refreshments: String,
    imageUrl: String
    // host: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'User'
	// }
  },
  {
    timestamps: true
  }
);

module.exports = model('Event', eventSchema);