const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');

const User = require('../models/User');

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

    const { firstName, lastName, username, password, secret } = req.body;

    // Register user only if they know the secret
    if (
      typeof secret !== 'string' ||
      secret.toLowerCase() !== config.get('registerSecret')
    ) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Secret is not correct' }] });
    }

    try {
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
        config.get('jwtSecret'),
        {
          expiresIn: 10800
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

module.exports = router;
