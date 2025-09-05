const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  rollNumber: String,
  branch: String,
  year: Number,
  phone: String,
  address: String
}, { _id: false });

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    profile: { type: profileSchema, default: {} }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
