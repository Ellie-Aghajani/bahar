const mongoose = require('mongoose');
const express = require('express');
const app = express();
const categories = require('./routes/categories')
const home = require('./routes/home')
const Joi = require('joi');
const port = process.env.PORT|| 2017;

mongoose.connect('mongodb://localhost/bahar')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));


app.use(express.json());
app.use('/api/categories', categories);
app.use('/', home);
app.use(express.urlencoded ({ extended: true })) ;
app.use(express.static('public'));



app.listen(port, ()=>{
    console.log(`App is listening on port ${port} 😎👌`);
});