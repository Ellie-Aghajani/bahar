import * as categoriesAPI from "./plantCategories";

const plants = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Snake Laurentii",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Low Light Tolerant" },
    numberInStock: 6,
    dailySalesRate: 2.5,
    liked: true
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Micans",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Low Light Tolerant" },
    numberInStock: 5,
    
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Calathea",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Pet Friendly" },
    numberInStock: 8,
    
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Zz Plant",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Hard to Kill" },
    numberInStock: 7,
    dailySalesRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Philodendron",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Hard to Kill" },
    numberInStock: 7,
    
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Fern",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Hard to Kill" },
    numberInStock: 7,
    
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Parlor Palm",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Pet Friendly" },
    numberInStock: 7,
    
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "Peperomia",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Pet Friendly" },
    numberInStock: 4,
   
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "Obtusifolia",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Low Light Tolerant" },
    numberInStock: 7,
    
  }
];

export function getPlants() {
  return plants;
}

export function getPlant(id) {
  return plants.find(m => m._id === id);
}

export function savePlant(plant) {
  let plantInDb = plants.find(m => m._id === plant._id) || {};
  plantInDb.title=plant.title;
  plantInDb.category = categoriesAPI.categories.find(g => g._id === plant.categoryId);
  plantInDb.numberInStock = plant.numberInStock;
  

  if (!plantInDb._id) {
    plantInDb._id = Date.now().toString();
    plants.push(plantInDb);
  }

  return plantInDb;
}

export function deletePlant(id) {
  let plantInDb = plants.find(m => m._id === id);
  plants.splice(plants.indexOf(plantInDb), 1);
  return plantInDb;
}
