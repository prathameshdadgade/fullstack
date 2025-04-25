const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    minlength: 2, 
    maxlength: 60 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 8, 
    maxlength: 16 
  },
  address: { 
    type: String, 
    maxlength: 400 
  },
  role: { 
    type: String, 
    enum: ['admin', 'user', 'storeOwner'], // Allow only these three roles
    default: 'user'
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
