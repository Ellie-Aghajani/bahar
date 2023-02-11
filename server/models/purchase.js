const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const Purchase = mongoose.model('Purchase', new mongoose.Schema({
  customer: { 
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      isGold: {
        type: Boolean,
        default: false
      },
      email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      }      
    }),  
    required: true
  },
  plant: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true, 
        minlength: 3,
        maxlength: 255
      },
      price: { 
        type: Number, 
        required: true,
        min: 0,
        max: 255
      }  
    }),
    required: true
  },
  dateOut: { 
    type: Date, 
    required: true,
    default: Date.now
  }
  
}));

function validatePurchase(purchase) {
  const schema = {
    customerId: Joi.objectId().required(),
    plantId: Joi.objectId().required()
  };

  return Joi.validate(purchase, schema);
}

exports.Purchase = Purchase; 
exports.validate = validatePurchase;