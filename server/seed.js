const { Category } = require("./models/category");
const { Plant } = require("./models/plant");
const { Image } = require("./index");

const mongoose = require("mongoose");
const config = require("config");

const data = [
  {
    name: "Low Light Tolerant",
    plants: [
      { image_url:"logo.jpeg", title: "Sanseviera ", description: "Sansevieria is a historically recognized genus of flowering plants, native to Africa, notably Madagascar, and southern Asia, now included in the genus Dracaena on the basis of molecular phylogenetic studies.", numberInStock: 10, price: 54 },
      { image_url:"logo.jpeg", title: "Zz-plant", description: "It contains an unusually high water contents of leaves (91%) and petioles (95%) and has an individual leaf longevity of at least six months, which may be the reason it can survive under low light levels without water.", numberInStock: 12, price: 70 },
      { image_url:"logo.jpeg", title: "Philodendron", description: "Their leaves are typically large, green, and glossy, and philodendrons are great for adding a bit of their native tropical flair to your home. These popular houseplants are known for their easy growing habits", numberInStock: 15, price: 65 }
    ]
  },
  {
    name: "Hard to Kill",
    plants: [
      { image_url:"", title: "Money tree", description: "It is said to bring good luck, prosperity, and good fortune according to the Chinese Feng Shui. This type of money plant is usually seen with braided or twisted trunk and it has lush green foliage growing at the top.", numberInStock: 20, price: 68 },
      { image_url:"", title: "Weeping fig", description:"They are normally pruned to keep them about 3 feet to 6 feet tall, and their trunks are sometimes braided for decorative appeal. It is a fast grower and may need to be repotted up to once per year.", numberInStock: 10, price: 56 },
      { image_url:"", title: "Reed palm", description: "It is a subtropical palm that grows up to 20 feet tall, and is commonly used as a houseplant. The evergreen leaves are pinnately divided, and yellow flowers are borne on a panicle.", numberInStock: 15, price: 63 }
    ]
  },
  {
    name: "Pet Friendly",
    plants: [
      { image_url:"", title: "Peacock plant", description: "Taking care of Calathea peacock and creating conditions in which it will flourish is not difficult when following some simple tips. Taking care of Calathea peacock can include frequent, lukewarm showers.", numberInStock: 13, price: 62 },
      { image_url:"", title: "Green prayer", description: "it has oval leaves that are green with purple markings between the veins. The veins are less prominent in this variety and it is noted for its large green spots.", numberInStock: 10, price: 86 },
      { image_url:"", title: "Calathea orbifolia",description: "The plant’s leaves are variegated with red, purple, and green colors. Calathea Orbifolia is an evergreen flowering plant that can grow to be up to 3 feet tall.", numberInStock: 15, price: 64 }
    ]
  }
];

async function seed() { //check

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

