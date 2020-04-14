const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Recipe = require('../models/Recipe');

// @route     GET api/recipes
// @desc      Get all recipes
// @access    Public
router.get('/', async (req, res) => {
  try {
    let recipes = await Recipe.find();

    res.json({ recipes });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route     GET api/recipes/:id
// @desc      Get a recipe
// @access    Public
router.get('/:id', async (req, res) => {
  try {
    let recipe = await Recipe.findOne({ _id: req.params.id });

    res.json({ recipe });
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
      description,
      servingSize,
      cookingTime
    } = req.body;

    try {
      let recipe = new Recipe({
        title,
        ingredients,
        description,
        servingSize,
        cookingTime,
        creatorId: req.user.id
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
    title,
    ingredients,
    instructions,
    description,
    servingSize,
    cookingTime
  } = req.body;

  const recipeFields = {};
  if (title) recipeFields.title = title;
  if (ingredients) recipeFields.ingredients = ingredients;
  if (instructions) recipeFields.instructions = instructions;
  if (description) recipeFields.description = description;
  if (servingSize) recipeFields.servingSize = servingSize;
  if (cookingTime) recipeFields.cookingTime = cookingTime;

  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ msg: 'Contact not found' });

    if (recipe.creatorId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        $set: recipeFields
      },
      {
        new: true
      }
    );

    res.json(recipe);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

// @route     DELETE api/recipes/:id
// @desc      Delete recipe
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ msg: 'Contact not found' });

    if (recipe.creatorId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Recipe.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Recipe deleted' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

// @route     GET api/recipes/user/:id
// @desc      Get all recipes from a user
// @access    Public
router.get('/user/:id', async (req, res) => {
  try {
    let recipes = await Recipe.find({ creatorId: req.params.id });

    res.json({ data: recipes });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
