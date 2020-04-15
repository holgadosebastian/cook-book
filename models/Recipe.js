const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  ingredients: {
    type: Array,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  servingSize: {
    type: Number,
    required: false
  },
  cookingTime: {
    type: Number,
    required: false
  },
  creatorId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('recipe', RecipeSchema);
