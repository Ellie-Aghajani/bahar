const winston = require("winston");
const express = require("express");
const config = require("config");
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();
const { Plant } = require( "./models/plant");
app.use(fileUpload());
app.use(express.json());
app.use(express.static('public'))

require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

// Define a schema for your data
// const imageSchema = new mongoose.Schema({
//   name: String,
//   data: Buffer
// });
// const Image = mongoose.model('Image', imageSchema);

// Set up a route to handle file uploads
app.post('/upload', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  console.log("_+_+_+_", req.files);
  console.log("_+_+_+_", req.file);


  const { image } = req.files;
  const { name } = image;
  const plant_id  = Object.values(req.body)[0];
  const plantId = mongoose.Types.ObjectId(plant_id);
  console.log("++++req++",req.body, Object.keys(req.body), Object.values(req.body));



  // Move the uploaded file to a temporary location on your server
  image.mv(`./public/uploads/${name}`, async (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    const plant = await Plant.findOne({_id: plantId});
    console.log("+++plant_id+++", plantId, plant);
    plant.image_url = name;
    await plant.save();

    // Read the file from the temporary location and convert it to binary data
    // const data = fs.readFileSync(`./public/uploads/${name}`);

    // Create a new document and save it to your database
    // const newImage = new Image({ name, data });
    // newImage.save((err) => {
    //   if (err) {
    //     return res.status(500).send(err);
    //   }

      res.send('File uploaded!');
    // });
  });
});



const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...😎👌`)
);

module.exports = server;