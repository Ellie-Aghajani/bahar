const morgan = require('morgan');
const express = require('express');
const app = express();
const categories = require('./routes/categories')
const home = require('./routes/home')
const logger = require('./middleware/logger')

const Joi = require('joi');
const port = process.env.PORT|| 2017;

app.set('view engine', 'pug');
app.use(express.json());
app.use('/api/categories', categories);
app.use('/', home);
app.use(express.urlencoded ({ extended: true })) ;
app.use(express.static('public'));

if (app.get('env') === 'development') {
    app.use(morgan('dev'));
};

app.listen(port, ()=>{
    console.log(`App is listening on port ${port} 😎👌`);
});