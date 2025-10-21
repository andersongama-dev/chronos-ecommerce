const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
   try {
      const {
         name,
         brand_id,
         description,
         specifications,
         price,
         style,
         gender,
         case_material,
         strap_material,
         strap_color,
         stock_quantity,
      } = req.body;

      if (
         !name ||
         !brand_id ||
         !description ||
         !specifications ||
         !price ||
         !style ||
         !gender ||
         !case_material ||
         !strap_material ||
         !strap_color ||
         !stock_quantity
      ) {
         return res.status(400).json({ error: "Fill in all fields" });
      }

      const newWatch = await pool.query(
         `INSERT INTO watches
         (name, brand_id, description, specifications, price, style, gender, case_material, strap_material, strap_color, stock_quantity)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
         RETURNING *;`,
         [
            name,
            brand_id,
            description,
            specifications,
            price,
            style,
            gender,
            case_material,
            strap_material,
            strap_color,
            stock_quantity,
         ]
      );

      res.status(201).json(newWatch.rows[0]);
   } catch (err) {
      console.error("Database Error:", err);

      if (err.constraint === "unique_watch_per_brand") {
         return res
            .status(400)
            .json({ error: "Já existe um relógio com esse nome nessa marca." });
      }

      res.status(500).json({ error: "Erro ao cadastrar o relógio." });
   }
});

router.put("/upd/:id", async (req, res) => {
   try {
      const watchId = req.params.id;
      const {
         name,
         brand_id, // ID da marca
         description,
         specifications,
         price,
         style,
         gender,
         case_material,
         strap_material,
         strap_color,
         stock_quantity,
         availability,
      } = req.body;

      const existing = await pool.query(
         "SELECT * FROM public.watches WHERE id = $1",
         [watchId]
      );

      if (existing.rows.length === 0) {
         return res.status(404).json({ error: "Relógio não encontrado." });
      }

      if (brand) {
         const brandExists = await pool.query(
            "SELECT id FROM public.brands WHERE id = $1",
            [brand]
         );
         if (brandExists.rows.length === 0) {
            return res.status(400).json({ error: "Marca não encontrada." });
         }
      }

      const updatedWatch = await pool.query(
         `
      UPDATE public.watches
      SET
        name = COALESCE($1, name),
        brand_id = COALESCE($2, brand_id),
        description = COALESCE($3, description),
        specifications = COALESCE($4, specifications),
        price = COALESCE($5, price),
        style = COALESCE($6, style),
        gender = COALESCE($7, gender),
        case_material = COALESCE($8, case_material),
        strap_material = COALESCE($9, strap_material),
        strap_color = COALESCE($10, strap_color),
        stock_quantity = COALESCE($11, stock_quantity),
        availability = COALESCE($12, availability)
      WHERE id = $13
      RETURNING *;
      `,
         [
            name,
            brand_id,
            description,
            specifications,
            price,
            style,
            gender,
            case_material,
            strap_material,
            strap_color,
            stock_quantity,
            availability,
            watchId,
         ]
      );

      res.json(updatedWatch.rows[0]);
   } catch (err) {
      console.error("Database Error:", err);

      if (err.constraint === "unique_watch_per_brand") {
         return res.status(400).json({
            error: "Já existe um relógio com esse nome nessa marca.",
         });
      }

      res.status(500).json({ error: "Erro ao atualizar o relógio." });
   }
});

router.delete("/delete/:id", async (req, res) => {
   try {
      const watchId = req.params.id;

      const existing = await pool.query(
         "SELECT * FROM public.watches WHERE id = $1",
         [watchId]
      );

      if (existing.rows.length === 0) {
         return res.status(404).json({ error: "Relógio não encontrado." });
      }

      const deleteWatch = await pool.query(
         `DELETE FROM public.watches WHERE id = $1`,
         [watchId]
      );
      res.json(deleteWatch.rows[0]);
   } catch {
      res.json({ message: "Relógio excluído com sucesso." });
   }
});

router.get("/list", async (req, res) => {
   try {
      const watches = await pool.query(`
         SELECT 
            w.id, 
            w.name, 
            w.price,
            w.stars,
            w.gender,
            w.style,
            w.case_material,
            w.strap_material,
            w.strap_color,
            b.name AS brand_name,
            w.brand_id,
            wi.image_url AS image
         FROM public.watches w
         LEFT JOIN public.brands b ON w.brand_id = b.id
         LEFT JOIN LATERAL (
            SELECT image_url 
            FROM public.watch_images 
            WHERE watch_id = w.id 
            ORDER BY display_order ASC 
            LIMIT 1
         ) wi ON true
         ORDER BY w.id ASC;
      `);

      res.json(watches.rows);
   } catch (err) {
      console.error("Database Error:", err);
      res.status(500).json({ error: "Erro ao buscar os relógios." });
   }
});

router.get("/list/:id", async (req, res) => {
   const { id } = req.params;

   try {
      const watchQuery = await pool.query(
         `
      SELECT 
        w.id, 
        w.name, 
        w.description,
        w.specifications,
        w.reviews,
        w.stars,
        w.price,
        w.availability,
        w.stock_quantity,
        w.gender,
        w.style,
        w.case_material,
        w.strap_material,
        w.strap_color,
        b.id AS brand_id,
        b.name AS brand_name
      FROM public.watches w
      LEFT JOIN public.brands b ON w.brand_id = b.id
      WHERE w.id = $1;
    `,
         [id]
      );

      if (watchQuery.rows.length === 0) {
         return res.status(404).json({ error: "Relógio não encontrado." });
      }

      const imagesQuery = await pool.query(
         `
      SELECT 
        id,
        image_url,
        alt_text,
        display_order
      FROM public.watch_images
      WHERE watch_id = $1
      ORDER BY display_order ASC;
    `,
         [id]
      );

      const watch = watchQuery.rows[0];
      watch.images = imagesQuery.rows;

      res.json(watch);
   } catch (err) {
      console.error("Database Error:", err);
      res.status(500).json({ error: "Erro ao buscar os detalhes do relógio." });
   }
});

module.exports = router;
