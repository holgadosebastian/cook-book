const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Recipe = require('../models/Recipe');

// @route     GET api/recipes
// @desc      Get all recipes
// @access    Private
router.get('/', auth, (req, res) => {
  res.send('Get all recipes');
});

// @route     GET api/recipes/:id
// @desc      Get a recipe
// @access    Private
router.get('/:id', auth, async (req, res) => {
  try {
    let recipe = await Recipe.findOne({ _id: req.params.id });

    res.json({ data: recipe });
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
    check('servingSize', 'Serving size must be an integer').isInt(),
    check('cookingTime', 'Cooking time must be an integer').isInt()
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
router.put('/:id', (req, res) => {
  res.send('Update recipe');
});

// @route     DELETE api/recipes/:id
// @desc      Delete recipe
// @access    Private
router.delete('/:id', (req, res) => {
  res.send('Delete recipe');
});

// @route     GET api/recipes/user/:id
// @desc      Get all recipes from a user
// @access    Private
router.get('/user/:id', auth, async (req, res) => {
  try {
    let recipes = await Recipe.find({ creatorId: req.params.id });

    res.json({ data: recipes });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
