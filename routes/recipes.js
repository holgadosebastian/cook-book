const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const loggedUser = require('../middleware/loggedUser');

const Recipe = require('../models/Recipe');

const isRecipePrivate = (isPrivate, user, recipeAuthor) => {
  if (!isPrivate) {
    return false;
  } else if (user && user.id == recipeAuthor._id) {
    // If the recipes is private but belongs to the user then its not private
    return false;
  }

  return true;
};

// Filter recipes depending on user making the request
const filterPrivateRecipes = (recipes, user) => {
  let availableRecipes = [];

  recipes.forEach((recipe) => {
    if (!isRecipePrivate(recipe.isPrivate, user, recipe.author))
      availableRecipes.push(recipe);
  });

  return availableRecipes;
};

// @route     GET api/recipes
// @desc      Get all recipes
// @access    Public
router.get('/', loggedUser, async (req, res) => {
  try {
    await Recipe.find()
      .lean()
      .exec((error, recipes) => {
        res.json({ recipes: filterPrivateRecipes(recipes, req.user) });
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route     GET api/recipes/latest
// @desc      Get latest recipes feed
// @access    Public
router.get('/latest', loggedUser, async (req, res) => {
  try {
    await Recipe.find()
      .sort({ date: -1 })
      .lean()
      .exec((error, recipes) => {
        let result = filterPrivateRecipes(recipes, req.user).slice(0, 3);

        res.json({ recipes: result });
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route     GET api/recipes/search
// @desc      Search recipes
// @access    Private
router.get('/search', auth, async (req, res) => {
  try {
    let recipes = await Recipe.find({
      $text: {
        $search: req.query.q
      }
    });

    res.json({ recipes: filterPrivateRecipes(recipes, req.user) });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route     GET api/recipes/:id
// @desc      Get a recipe
// @access    Public
router.get('/:id', loggedUser, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(404).send('Not Found');
    } else {
      let recipe = await Recipe.findOne({ _id: req.params.id });

      if (
        recipe !== null &&
        !isRecipePrivate(recipe.isPrivate, req.user, recipe.author)
      ) {
        res.json({ recipe });
      } else {
        // Recipe is private 404
        res.status(404).send('Not Found');
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/recipes
// @desc      Add new recipe
// @access    Private
router.post(
  '/',
  [
    auth,
    check('title', 'A title for a recipe is required').not().isEmpty(),
    check('ingredients', 'Ingredients for a recipe are required')
      .not()
      .isEmpty(),
    check('instructions', 'Basic instructions for a recipe are required')
      .not()
      .isEmpty()
    // TODO: Add correct validation for servingSize and cookingTime
    // check('servingSize', 'Serving size must be an integer')
    //   .isInt()
    //   .bail()
    //   .isEmpty(),
    // check('cookingTime', 'Cooking time must be an integer').isEmpty().isInt()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      ingredients,
      instructions,
      description,
      servingSize,
      cookingTime,
      mainImage,
      isPrivate
    } = req.body;

    try {
      let recipe = new Recipe({
        title,
        ingredients,
        instructions,
        description,
        servingSize,
        cookingTime,
        author: req.user.id,
        mainImage,
        isPrivate
      });

      await recipe.save();

      res.json({ recipe });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// @route     PUT api/recipes/:id
// @desc      Update recipe
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const {
    mainImage,
    title,
    ingredients,
    instructions,
    description,
    servingSize,
    cookingTime,
    isPrivate
  } = req.body;

  const recipeFields = {};
  if (mainImage) recipeFields.mainImage = mainImage;
  if (title) recipeFields.title = title;
  if (ingredients) recipeFields.ingredients = ingredients;
  if (instructions) recipeFields.instructions = instructions;
  if (description) recipeFields.description = description;
  if (servingSize) recipeFields.servingSize = servingSize;
  if (cookingTime) recipeFields.cookingTime = cookingTime;
  recipeFields.isPrivate = isPrivate;

  try {
    let recipe = await Recipe.findOne({ _id: req.params.id });

    if (!recipe) return res.status(404).json({ msg: 'Recipe not found' });

    if (recipe.author._id.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    recipe = await Recipe.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: recipeFields
      },
      {
        new: true
      }
    );

    res.json(recipe);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route     DELETE api/recipes/:id
// @desc      Delete recipe
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let recipe = await Recipe.findOne({ _id: req.params.id });

    if (!recipe) return res.status(404).json({ msg: 'Contact not found' });

    if (recipe.author._id.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Recipe.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Recipe deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route     GET api/recipes/user/:username
// @desc      Get all recipes from a user
// @access    Public
router.get('/user/:username', loggedUser, (req, res) => {
  try {
    Recipe.find().exec((err, recipes) => {
      recipes = recipes.filter((recipe) => {
        return recipe.author
          ? recipe.author.username === req.params.username
          : false;
      });

      res.json({ recipes: filterPrivateRecipes(recipes, req.user) });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
