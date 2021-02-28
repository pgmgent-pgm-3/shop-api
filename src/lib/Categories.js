import knexShop from "../db/knexShop.js";

export default class Categories {
  constructor() {
    this.table = "categories";
  }

  /**
   * Get products
   *
   * @param {null|string} id
   */
  async get(id = null) {
    try {
      if (!id) {
        return await knexShop(this.table).select("*");
      }
      const [category] = await knexShop(this.table).where("id", parseInt(id));
      return category;
    } catch (message) {
      console.error(message);
    }
  }

  async add(field) {
    try {
      return await knexShop(this.table).insert(field);
    } catch (message) {
      console.error(message);
    }
  }
}
