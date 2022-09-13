const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const spaceSchema = new Schema(
  {
    name: String,
    description: String,
    imageUrl: String
  },
  {
    timestamps: true
  }
);

module.exports = model('Space', spaceSchema);
