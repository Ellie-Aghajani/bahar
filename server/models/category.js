const Joi = require('joi');
const mongoose = require('mongoose');

const Category = mongoose.model('Category', new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    }
}));

function validateCategory(category) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(category, schema);
}



exports.Category = this.Category; 
exports.validate = validateCategory;