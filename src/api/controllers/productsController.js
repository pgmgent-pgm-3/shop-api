import Products from "../../lib/Products.js";

/* Variables */
const productsDB = new Products();

export const getProducts = async (req, res) => {
  const products = await productsDB.get();
  res.status(200).json(products);
};

export const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productsDB.get(productId);
    if (!product) throw new Error("Product not found");
    res.status(200).json(product);
  } catch (message) {
    res.status(404).json({ error: message.toString() });
  }
};
