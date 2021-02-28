import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

import { api } from "./api/routes/index.js";

app.use("/api", cors(), api);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server is listening at http://localhost:${PORT}!`);
});
