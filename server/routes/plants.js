const {Plant, validate} = require('../models/plant'); 
const {Category} = require('../models/category');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const plants = await Plant.find().sort('name');
  res.send(plants);
});

router.post('/', async (req, res) => {
  // const { error } = validate(req.body); 
  // if (error) return res.status(400).send(error.details[0].message);
  console.log("req++++", req.body);
  console.log("files++++", req.files);
  
  
  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send('Invalid category.');

  const plant = new Plant({ 
    title: req.body.title,
    image: req.body.image,

    category: {
      _id: category._id,
      name: category.name
    },
    description: req.body.description,
    numberInStock: req.body.numberInStock,
    price: req.body.price


  });
  await plant.save();
  
  res.send(plant);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send('Invalid category.');

  const plant = await Plant.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      image: req.body.image,

      category: {
        _id: category._id,
        name: category.name
      },
      description: req.body.description,
      numberInStock: req.body.numberInStock,
      price: req.body.price

    }, { new: true });

  if (!category) return res.status(404).send('The plant with the given ID was not found.');
  
  res.send(plant);
});

router.delete('/:id', async (req, res) => {
  const plant = await Plant.findByIdAndRemove(req.params.id);

  if (!plant) return res.status(404).send('The plant with the given ID was not found.');

  res.send(plant);
});

router.get('/:id', async (req, res) => {
  const plant = await Plant.findById(req.params.id);

  if (!plant) return res.status(404).send('The plant with the given ID was not found.');

  res.send(plant);
});

module.exports = router; 