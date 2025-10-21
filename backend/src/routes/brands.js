const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
   try {
      const result = await pool.query("SELECT * FROM brands ORDER BY name;");
      res.json(result.rows);
   } catch (err) {
      console.error("Erro ao buscar marcas:", err);
      res.status(500).json({ error: "Erro ao buscar marcas" });
   }
});

router.get("/:id", async (req, res) => {
   try {
      const { id } = req.params;
      const result = await pool.query("SELECT * FROM brands WHERE id = $1;", [
         id,
      ]);

      if (result.rows.length === 0)
         return res.status(404).json({ error: "Marca não encontrada" });

      res.json(result.rows[0]);
   } catch (err) {
      console.error("Erro ao buscar marca:", err);
      res.status(500).json({ error: "Erro ao buscar marca" });
   }
});

router.post("/", async (req, res) => {
   try {
      const { name, email, country } = req.body;

      if (!name)
         return res
            .status(400)
            .json({ error: "O nome da marca é obrigatório" });

      const existing = await pool.query(
         "SELECT * FROM brands WHERE name = $1;",
         [name]
      );
      if (existing.rows.length > 0)
         return res.status(400).json({ error: "Essa marca já existe" });

      const result = await pool.query(
         "INSERT INTO brands (name, email, country) VALUES ($1, $2, $3) RETURNING *;",
         [name, email || null, country || null]
      );

      res.status(201).json({
         message: "Marca criada com sucesso",
         brand: result.rows[0],
      });
   } catch (err) {
      console.error("Erro ao criar marca:", err);
      res.status(500).json({ error: "Erro ao criar marca" });
   }
});

router.put("/:id", async (req, res) => {
   try {
      const { id } = req.params;
      const { name, email, country } = req.body;

      const result = await pool.query(
         "UPDATE brands SET name = $1, email = $2, country = $3 WHERE id = $4 RETURNING *;",
         [name, email || null, country || null, id]
      );

      if (result.rows.length === 0)
         return res.status(404).json({ error: "Marca não encontrada" });

      res.json({
         message: "Marca atualizada com sucesso",
         brand: result.rows[0],
      });
   } catch (err) {
      console.error("Erro ao atualizar marca:", err);
      res.status(500).json({ error: "Erro ao atualizar marca" });
   }
});

router.delete("/:id", async (req, res) => {
   try {
      const { id } = req.params;
      const result = await pool.query(
         "DELETE FROM brands WHERE id = $1 RETURNING *;",
         [id]
      );

      if (result.rows.length === 0)
         return res.status(404).json({ error: "Marca não encontrada" });

      res.json({ message: "Marca excluída com sucesso" });
   } catch (err) {
      console.error("Erro ao excluir marca:", err);
      res.status(500).json({ error: "Erro ao excluir marca" });
   }
});

module.exports = router;
