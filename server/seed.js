const { Category } = require("./models/category");
const { Plant } = require("./models/plant");
const mongoose = require("mongoose");
const config = require("config");

const data = [
  {
    name: "Low Light Tolerant",
    plants: [
      { title: "Sanseviera ", numberInStock: 10, price: 54 },
      { title: "Zz-plant", numberInStock: 12, price: 70 },
      { title: "Philodendron", numberInStock: 15, price: 65 }
    ]
  },
  {
    name: "Hard to Kill",
    plants: [
      { title: "Money tree", numberInStock: 20, price: 68 },
      { title: "Weeping fig", numberInStock: 10, price: 56 },
      { title: "Reed palm", numberInStock: 15, price: 63 }
    ]
  },
  {
    name: "Pet Friendly",
    plants: [
      { title: "Peacock plant", numberInStock: 13, price: 62 },
      { title: "Green prayer", numberInStock: 10, price: 86 },
      { title: "Calathea orbifolia", numberInStock: 15, price: 64 }
    ]
  }
];

async function seed() {

  await mongoose.connect(config.get("db"));
  await Plant.deleteMany({});
  await Category.deleteMany({});

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

