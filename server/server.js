const express = require('express');
const app = express();
const Joi = require('joi');
const port = process.env.PORT|| 2017;

app.use(express.json());

const categories = [
    {id:1, name:'Low Light Tolerant'}, 
    {id:2, name: 'Pet-friendly'},
    {id:3, name: 'Hard to Kill'},
]


app.get('/', (req, res) =>{
    res.send('This is homepage');
})

app.get('/api/categories', (req, res) =>{
    res.send([1,2,3]);
});

app.post('/api/categories', (req, res) =>{
    const {error} = validateCategories(req.body);
    
    if (error) return res.status(400).send(result.error.details[0].message);
    
    //
    const category = {
        id: categories.length + 1,
        name: req.body.name
    };
    categories.push(category);
    res.send(category);
});



app.get('/api/categories/:id', (req, res) =>{
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) return res.status(404).send('Not Found');
    
    res.send(category);
});

app.put('api/categories/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) return res.status(404).send('Not Found');
 
    const {error} = validateCategories(req.body);
    
    if (error) return res.status(400).send(result.error.details[0].message);

    category.name = req.body.name;
    res.send(category);


});
function validateCategories(category) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(category, schema);
}

app.delete('/api/categories/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) return res.status(404).send('Not Found');
    //delete
    const index = categories.indexOf(category);
    categories.splice(index, 1);

    res.send(category);
});

app.listen(port, ()=>{
    console.log(`App is listening on port ${port} 😎👌`);
});