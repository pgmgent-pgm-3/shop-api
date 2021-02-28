import knexShop from "../db/knexShop.js";

export default class Products {
  constructor() {
    this.table = "products";
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
      const [product] = await knexShop(this.table).where("id", parseInt(id));
      return product;
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
