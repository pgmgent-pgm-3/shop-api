/*
Import packages
*/
import express from "express";
import * as productsController from "../controllers/productsController.js";
import * as categoriesController from "../controllers/categoriesController.js";

/*
Make a router
*/
const router = express.Router();

/*
Register API endpoints
*/
router.get("/products", productsController.getProducts);
router.get("/products/:id", productsController.getProduct);
router.get("/categories", categoriesController.getCategories);
router.get("/categories/:id", categoriesController.getCategory);

// export router endpoints as api
export { router as api };
