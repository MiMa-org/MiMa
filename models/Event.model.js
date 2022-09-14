const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const eventSchema = new Schema(
  {
    title: String,
    address: String,
    description: String,
    artists: String,
    topic: String,
    medium: String,
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