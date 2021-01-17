const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema ({
  FIO: { type: String},
  login: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', User)
