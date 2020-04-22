const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = Schema({
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
  mainImage: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: 'image'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const autoPopulateRecipes = function (next) {
  this.populate('author', ['-password', '-date', '-__v']);
  this.populate('mainImage');
  next();
};

RecipeSchema.pre('findOne', autoPopulateRecipes)
  .pre('find', autoPopulateRecipes)
  .pre('findOneAndUpdate', autoPopulateRecipes);

module.exports = mongoose.model('recipe', RecipeSchema);
