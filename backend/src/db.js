const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
   host: "localhost",
   port: process.env.POSTGRES_PORT || 5433,
   user: process.env.POSTGRES_USER,
   password: process.env.POSTGRES_PASSWORD,
   database: process.env.POSTGRES_DB,
});

pool
   .connect()
   .then(() => console.log("Conectado ao PostgreSQL"))
   .catch((err) => console.error("Erro ao conectar:", err));

module.exports = pool;
