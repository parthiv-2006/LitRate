const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // Adds 'createdAt' and 'updatedAt' fields
    timestamps: true,
  }
);

// --- Password Hashing ---
// This function runs BEFORE a 'save' command (like creating a new user)
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  // Generate a 'salt' (random string) to make the hash secure
  const salt = await bcrypt.genSalt(10);
  // Re-assign the user's plain-text password to the new, hashed password
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// --- Password Comparison Method ---
// We'll use this for logging in
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;