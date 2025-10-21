const express = require("express");
const router = express.Router();
const pool = require("../db");
const { Model } = require("sequelize");

router.get("/:userId", async (req, res) => {
   const { userId } = req.params;

   try {
      const result = await pool.query(
         `
         SELECT 
            c.id AS cart_item_id,
            c.quantity,
            w.id AS watch_id,
            w.name,
            w.price,
            wi.image_url,
            b.name AS brand_name
         FROM cart_items c
         JOIN watches w ON c.watch_id = w.id
         LEFT JOIN brands b ON w.brand_id = b.id
         LEFT JOIN LATERAL (
            SELECT image_url
            FROM watch_images
            WHERE watch_id = w.id
            ORDER BY display_order ASC
            LIMIT 1
         ) wi ON true
         WHERE c.user_id = $1
         ORDER BY c.added_at DESC;
         `,
         [userId]
      );

      res.json(result.rows);
   } catch (err) {
      console.error("Erro ao listar carrinho:", err);
      res.status(500).json({ error: "Erro ao listar carrinho do usuário." });
   }
});

// 🔹 Adicionar ou atualizar item no carrinho
router.post("/", async (req, res) => {
   const { user_id, watch_id, quantity } = req.body;

   try {
      const result = await pool.query(
         `
         INSERT INTO cart_items (user_id, watch_id, quantity)
         VALUES ($1, $2, $3)
         ON CONFLICT (user_id, watch_id)
         DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
         RETURNING *;
         `,
         [user_id, watch_id, quantity]
      );

      res.json(result.rows[0]);
   } catch (err) {
      console.error("Erro ao adicionar item ao carrinho:", err);
      res.status(500).json({ error: "Erro ao adicionar item ao carrinho." });
   }
});

// 🔹 Atualizar quantidade
router.put("/:cartItemId", async (req, res) => {
   const { cartItemId } = req.params;
   const { quantity } = req.body;

   try {
      const result = await pool.query(
         `UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *;`,
         [quantity, cartItemId]
      );
      res.json(result.rows[0]);
   } catch (err) {
      console.error("Erro ao atualizar quantidade:", err);
      res.status(500).json({ error: "Erro ao atualizar o item do carrinho." });
   }
});

// 🔹 Remover item
router.delete("/:cartItemId", async (req, res) => {
   const { cartItemId } = req.params;
   try {
      await pool.query(`DELETE FROM cart_items WHERE id = $1;`, [cartItemId]);
      res.json({ success: true });
   } catch (err) {
      console.error("Erro ao remover item:", err);
      res.status(500).json({ error: "Erro ao remover item do carrinho." });
   }
});

module.exports = router;
