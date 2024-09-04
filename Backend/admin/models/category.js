const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category: { 
    type: String, 
    required: true,
    unique: true,
    
   
  },
  images: [{ 
    type: String 
  }],
});

module.exports = mongoose.model('Category', categorySchema);
