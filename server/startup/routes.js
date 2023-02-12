const express = require('express');
const categories = require('../routes/categories');
const customers = require('../routes/customers');
const plants = require('../routes/plants');
const purchases = require('../routes/purchases');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/categories', categories);
  app.use('/api/customers', customers);
  app.use('/api/plants', plants);
  app.use('/api/purchases', purchases);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use(error);
}