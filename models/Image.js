const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = Schema({
  imageName: {
    type: String,
    default: 'none',
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('image', ImageSchema);
