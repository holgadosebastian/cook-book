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
  author: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const autoPopulateRecipes = function (next) {
  this.populate('author', '-password');
  next();
};

RecipeSchema.pre('findOne', autoPopulateRecipes).pre(
  'find',
  autoPopulateRecipes
);

module.exports = mongoose.model('recipe', RecipeSchema);
