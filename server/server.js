const express = require('express');
const app = express();
const port = process.env.port|| 2017;

app.get('/', (req, res) =>{
    res.send('This is homepage');
})

app.listen(port, ()=>{
    console.log(`App is listening on port ${port} 😎👌`);
});