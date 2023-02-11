const Joi = require('joi');
const mongoose = require('mongoose');
const {categorySchema} = require('./category');

const Plant = mongoose.model('Plants', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  category: { 
    type: categorySchema,  
    required: true
  },
  numberInStock: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  },

}));

function validatePlant(plant) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    categoryId: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
  };

  return Joi.validate(plant, schema);
}

exports.Plant = Plant; 
exports.validate = validatePlant;