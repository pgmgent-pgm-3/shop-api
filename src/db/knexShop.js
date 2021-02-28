import knex from "knex";

const dbConfig = {
  client: "sqlite3",
  connection: {
    filename: "./src/db/shop.db3",
  },
  useNullAsDefault: true,
};

const knexShop = knex(dbConfig);

export default knexShop;
