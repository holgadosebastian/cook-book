const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Image = require('../models/Image');

// @route     POST api/image
// @desc      Uploads an image
// @access    Private
// TODO: Add validation
router.post('/', auth, async (req, res) => {
  try {
    let newImage = new Image({
      imageName: req.body.imageName,
      imageUrl: req.body.imageUrl
    });

    let image = await newImage.save();

    res.json({
      image
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
