const { Category } = require("./models/category");
const { Plant } = require("./models/plant");
const mongoose = require("mongoose");
const config = require("config");

const data = [
  {
    name: "Low Light Tolerant",
    plants: [
      { title: "Begonia ", numberInStock: 5, price: 54 },
      { title: "Velvet Elvis", numberInStock: 10, price: 23 },
      { title: "Sweet Alyssum", numberInStock: 15, price: 65 }
    ]
  },
  {
    name: "Hard to Kill",
    plants: [
      { title: "Catmint", numberInStock: 5, price: 65 },
      { title: "Zinnia", numberInStock: 10, price: 46 },
      { title: "Pansies", numberInStock: 15, price: 56 }
    ]
  },
  {
    name: "Pet Friendly",
    plants: [
      { title: "Common Snapdragon", numberInStock: 5, price: 76 },
      { title: "African Violets", numberInStock: 10, price: 86 },
      { title: "Celosia", numberInStock: 15, price: 65 }
    ]
  }
];

async function seed() {
  const mongoPassword = process.env.MONGO_PASSWORD;
  const mongoHost = process.env.MONGO_HOST;
  console.log('+++++++++++', mongoPassword );
  await mongoose.connect(`mongodb://localhost:27017/baharfinal`)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', `mongodb+srv://admin:6263@bahar.wzugx7i.mongodb.net/?retryWrites=true&w=majority`));

  // await Plant.deleteMany({});
  // await Category.deleteMany({});

  for (let category of data) {
    const { _id: categoryId } = await new Category({ name: category.name }).save();
    const plants = category.plants.map(plant => ({
      ...plant,
      category: { _id: categoryId, name: category.name }
    }));
    await Plant.insertMany(plants);
  }

  mongoose.disconnect();

  console.info("Done!");
}

seed();