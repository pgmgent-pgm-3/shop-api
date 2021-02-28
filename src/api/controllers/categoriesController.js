import Categories from "../../lib/Categories.js";

/* Variables */
const categoriesDB = new Categories();

export const getCategories = async (req, res) => {
  const categories = await categoriesDB.get();
  res.status(200).json(categories);
};

export const getCategory = async (req, res) => {
  try {
    const categoryID = req.params.id;
    console.log(categoryID);
    const category = await categoriesDB.get(categoryID);
    if (!category) throw new Error("Category not found");
    res.status(200).json(category);
  } catch (message) {
    res.status(404).json({ error: message.toString() });
  }
};
