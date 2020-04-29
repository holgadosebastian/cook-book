const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: 'image'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const autoPopulateUsers = function (next) {
  this.populate('profileImage', ['-date', '-__v']);
  next();
};

UserSchema.pre('findOne', autoPopulateUsers)
  .pre('find', autoPopulateUsers)
  .pre('findOneAndUpdate', autoPopulateUsers);

module.exports = mongoose.model('user', UserSchema);
