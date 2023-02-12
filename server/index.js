const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(`mongodb://localhost:27017/baharfinal`)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

const express = require('express');
const categories = require('./routes/categories');
const customers = require('./routes/customers');
const plants = require('./routes/plants');
const purchases = require('./routes/purchases');


const app = express();
const port = process.env.PORT|| 2017;


app.use(express.json());
app.use('/api/categories', categories);
app.use('/api/customers', customers);
app.use('/api/plants', plants);
app.use('/api/purchases', purchases);





app.listen(port, ()=>{
    console.log(`App is listening on port ${port} 😎👌`);
});