const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
require('dotenv').config();

const User = require('../models/User');
const Recipe = require('../models/Recipe');

// @route     GET api/users
// @desc      Get a user
// @access    Private
router.get('/:id', async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });

    let userRecipes = await Recipe.find({ author: req.params.id });

    const { _id, firstName, lastName, username, profileImage } = user;

    res.json({
      _id,
      firstName,
      lastName,
      username,
      profileImage,
      recipesAmount: userRecipes.length
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/users
// @desc      Register a User
// @access    Public
router.post(
  '/',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must have 6 or more characters').isLength({
      min: 6
    }),
    check('secret', 'Secret is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, password, secret } = req.body;

    // Username should only be lowercase
    const username = req.body.username.toLowerCase();

    try {
      // Register user only if they know the secret
      if (secret !== process.env.REGISTER_SECRET) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Secret is not correct' }] });
      }

      let user = await User.findOne({ username });

      if (user) {
        return res.status(400).json([
          {
            msg: 'User already exists'
          }
        ]);
      }

      user = new User({
        firstName,
        lastName,
        username,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// @route     PUT api/users/:id
// @desc      Updates a User
// @access    Private
router.put('/:id', auth, async (req, res) => {
  if (req.params.id !== req.user.id) {
    return res.status(401).json([{ msg: 'Not authorized' }]);
  }

  const { firstName, lastName, profileImage } = req.body;
  let userFields = {};

  if (firstName) userFields.firstName = firstName;
  if (lastName) userFields.lastName = lastName;
  if (profileImage) userFields.profileImage = profileImage;

  try {
    let user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: userFields
      },
      {
        new: true
      }
    );

    let userRecipes = await Recipe.find({ author: req.params.id });

    const { _id, firstName, lastName, username, profileImage } = user;

    res.json({
      _id,
      firstName,
      lastName,
      username,
      profileImage,
      recipesAmount: userRecipes.length
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
