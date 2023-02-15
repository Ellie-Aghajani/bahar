const Joi = require('joi');
const mongoose = require('mongoose');
const {categorySchema} = require('./category');
// const {imageSchema} = require('../index'); //ckeck



const Plant = mongoose.model('Plants', new mongoose.Schema({
  image: { //check
    name: String,
    data: Buffer  
  },
  image_url: {
    type: String
  },
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
  description: {
    type: String,
    required: false,
    trim: false, 
    minlength: 5,
    maxlength: 255
  },
  numberInStock: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  },
  price: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  }

}));

function validatePlant(plant) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    image: Joi.string().min(5).max(50).required(),//check
    // categoryId: Joi.objectId().required(),
    categoryId: Joi.string().required(),
    
    description: Joi.string().min(5).max(50),
    numberInStock: Joi.number().min(0).required(),
    price: Joi.number().min(0).required()

  };

  return Joi.validate(plant, schema);
}

exports.Plant = Plant; 
exports.validate = validatePlant;