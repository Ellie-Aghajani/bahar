const {Purchase, validate} = require('../models/purchase'); 
const {Plant} = require('../models/plant'); 
const {Customer} = require('../models/customer'); 
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();


Fawn.init(mongoose);

router.get('/', async (req, res) => {
  const purchases = await Purchase.find().sort('-dateOut');
  res.send(purchases);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const plant = await Plant.findById(req.body.plantId);
  if (!plant) return res.status(400).send('Invalid plant.');

  if (plant.numberInStock === 0) return res.status(400).send('Plant not in stock.');

  let purchase = new Purchase({ 
    customer: {
      _id: customer._id,
      name: customer.name, 
      email: customer.email
    },
    plant: {
      _id: plant._id,
      title: plant.title,
      price: plant.price
    }
  });
  // purchase = await purchase.save();

  // plant.numberInStock--;
  // plant.save();
  try {
    new Fawn.Task()
      .save("purchases", purchase)
      .update('plants', {_id: plant._id}, {
        $inc: { numberInStock: -1 }
      })
      .run();
    res.send(purchase);

  }
  catch{
    res.status(500).send('something failed.')
  }
  
});

router.get('/:id', async (req, res) => {
  const purchase = await Purchase.findById(req.params.id);

  if (!purchase) return res.status(404).send('The purchase with the given ID was not found.');

  res.send(purchase);
});

module.exports = router; 