const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const venueSchema = new Schema(
  {
    name: String,
    address: String,
    description: String,
    website: String,
    topic: String,
    medium: String,
    offer: String,
    imageUrl: String
  },
  {
    timestamps: true
  }
);

module.exports = model('Venue', venueSchema);
