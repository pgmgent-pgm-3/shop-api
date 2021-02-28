/* Imports */
import faker from "faker";
import _ from "underscore";
import Products from "../lib/Products.js";
import Categories from "../lib/Categories.js";
import { fetchImageUrl } from "../utils/index.js";

/* Constants */
const UNSPLASH_IMAGE_API = "https://source.unsplash.com/350x500?";

/* Variables */
const productsDB = new Products();
const categoriesDB = new Categories();

/**
 * Create an amount of categories with Faker.js
 *
 * @param {Number} amount
 */
const createCategories = (amount) => {
  const categories = [];
  let amountOfDepartments = 0;
  while (amountOfDepartments < amount) {
    const category = faker.commerce.department();
    if (categories.indexOf(category) < 0) {
      categories.push(category);
      amountOfDepartments++;
    }
  }
  return categories;
};

/**
 *
 * @param {Number} amount
 * @param {Array} categoryIDs
 */
const createProducts = async (amount, categoryIDs) => {
  const products = [];

  for (let i = 0; i < amount; i++) {
    const name = faker.commerce.product();
    const product = {
      name: name,
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      category_id: _.sample(categoryIDs),
      image: await fetchImageUrl(`${UNSPLASH_IMAGE_API}${faker.helpers.slugify(name.toLowerCase())}`),
    };
    console.log(`Created a new fake product: ${product.name}`);
    products.push(product);
  }

  return products;
};

/**
 * Seed the database
 *
 * @param {Array} categories
 */
const seedCategories = async (categories) => {
  try {
    const ids = categories.map(async (category) => {
      const [id] = await categoriesDB.add({ name: category });
      return id;
    });

    return Promise.all(ids); // if all insert promises are resolved, return the ids's.
  } catch (message) {
    return console.error(message);
  }
};

/**
 * Seed the products table in bulk
 *
 * @param { Array } products
 */
const seedProducts = async (products) => {
  try {
    const ids = products.map(async (product) => {
      return await productsDB.add(product);
    });

    return Promise.all(ids); // if all insert promises are resolved, return the ids's.
  } catch (message) {
    return console.error(message);
  }
};

const seed = async () => {
  const categories = createCategories(20);
  const categoryIDs = await seedCategories(categories);
  console.log(`Added ${categoryIDs.length} categories to database`);

  // alternative if no more categories must be added
  // const categories = await categoriesDB.get();
  // const categoryIDs = categories.map((category) => category.id);

  const products = await createProducts(30, categoryIDs);
  const productsIDs = await seedProducts(products);
  console.log(`Added ${productsIDs.length} products to database`);

  // if all
  Promise.all(categoryIDs, productsIDs).then(() => {
    console.log(`Closing the seeder!`);
    process.exit();
  });
};

// initialize the seeder
seed();
