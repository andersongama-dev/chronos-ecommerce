const express = require("express");
const cors = require("cors");
const pool = require("./db");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = 5000;

const userRoutes = require("./routes/users");
const watchRoutes = require("./routes/watches");
const cartRoutes = require("./routes/carts");
const brandsRoutes = require("./routes/brands");

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
   try {
      const result = await pool.query("SELECT NOW()");
      res.json({ data: result.rows[0] });
   } catch (err) {
      console.error(err.message);
      res.status(500).send("Erro no servidor");
   }
});

app.get("/sobre", (req, res) => {
   res.send("Minha pagina sobre");
});

app.use("/users", userRoutes);

app.use("/watches", watchRoutes);

app.use("/cart", cartRoutes);

app.use("/brands", brandsRoutes);

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
