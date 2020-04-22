const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');

const Image = require('../models/Image');

// TODO: Fix storage not working
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalName);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  dest: 'uploads/',
  // storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// @route     POST api/image
// @desc      Uploads an image
// @access    Private
// TODO: Add auth
router.post('/', auth, upload.single('imageData'), (req, res) => {
  try {
    let newImage = new Image({
      imageName: req.body.imageName,
      imageData: req.file.path
    });

    newImage.save().then((result) => {
      res.json({
        result
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
