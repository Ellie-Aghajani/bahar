const express = require('express');
const router = express.Router();

const categories = [
    {id:1, name:'Low Light Tolerant'}, 
    {id:2, name: 'Pet-friendly'},
    {id:3, name: 'Hard to Kill'},
];

router.get('/', (req, res) =>{
    res.send([1,2,3]);
});

router.post('/', (req, res) =>{
    const {error} = validateCategories(req.body);
    
    if (error) return res.status(400).send(result.error.details[0].message);
    
    const category = {
        id: categories.length + 1,
        name: req.body.name
    };
    categories.push(category);
    res.send(category);
});



router.get('/:id', (req, res) =>{
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) return res.status(404).send('Not Found');
    
    res.send(category);
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) return res.status(404).send('Not Found');
    //delete
    const index = categories.indexOf(category);
    categories.splice(index, 1);

    res.send(category);
});

module.exports = router;