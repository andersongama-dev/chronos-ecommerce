const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
   try {
      const { name, email, phone, address, password } = req.body;

      if (!name || !email || !password) {
         return res
            .status(400)
            .json({ error: "Name, email, and password are required" });
      }

      const existingUser = await pool.query(
         "SELECT * FROM users WHERE email = $1",
         [email]
      );

      if (existingUser.rows.length > 0) {
         return res.status(400).json({ error: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await pool.query(
         `INSERT INTO users (name, email, phone, address, password)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *;`,
         [name, email, phone || null, address || null, hashedPassword]
      );

      res.status(201).json({
         message: "User registered successfully",
         user: newUser.rows[0],
      });
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error registering user" });
   }
});

router.post("/login", async (req, res) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         return res
            .status(400)
            .json({ error: "Email and password are required" });
      }

      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
         email,
      ]);
      if (result.rows.length === 0) {
         return res.status(400).json({ error: "Invalid email or password" });
      }

      const user = result.rows[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ error: "Invalid email or passowrd" });
      }

      const token = jwt.sign(
         { id: user.id, email: user.email },
         process.env.JWT_SECRET,
         { expiresIn: "1h" }
      );

      res.status(200).json({
         message: "Login successful",
         token,
         user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
         },
      });
   } catch (err) {
      console.error(err);
      res.status(500).json({
         error: "Error logging in",
      });
   }
});

const authenticateToken = (req, res, next) => {
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1];
   if (!token) return res.status(401).json({ error: "Access denied" });

   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: "Invalid token" });
      req.user = user;
      next();
   });
};

router.get("/profile", authenticateToken, async (req, res) => {
   try {
      const result = await pool.query(
         "SELECT id, name, email, phone, address, role FROM users WHERE id = $1",
         [req.user.id]
      );

      if (result.rows.length === 0)
         return res.status(404).json({ error: "User not found" });

      res.json({ user: result.rows[0] });
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
   }
});

// PUT /users/:id
router.put("/:id", authenticateToken, async (req, res) => {
   const { id } = req.params;
   const { name, email, phone, address, role } = req.body;

   try {
      // Verifica se o usuário existe
      const userCheck = await pool.query("SELECT * FROM users WHERE id = $1", [
         id,
      ]);
      if (userCheck.rows.length === 0) {
         return res.status(404).json({ error: "Usuário não encontrado." });
      }

      // Atualiza os campos informados
      const updatedUser = await pool.query(
         `UPDATE users
          SET name = COALESCE($1, name),
              email = COALESCE($2, email),
              phone = COALESCE($3, phone),
              address = COALESCE($4, address),
              role = COALESCE($5, role)
          WHERE id = $6
          RETURNING id, name, email, phone, address, role;`,
         [name, email, phone, address, role, id]
      );

      res.json(updatedUser.rows[0]);
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao atualizar usuário." });
   }
});

// PUT /users/reset-password/:id
router.put("/reset-password/:id", authenticateToken, async (req, res) => {
   const { id } = req.params;
   const { password } = req.body;

   if (!password) {
      return res.status(400).json({ error: "Nova senha é obrigatória." });
   }

   try {
      const userCheck = await pool.query("SELECT * FROM users WHERE id = $1", [
         id,
      ]);
      if (userCheck.rows.length === 0) {
         return res.status(404).json({ error: "Usuário não encontrado." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await pool.query("UPDATE users SET password = $1 WHERE id = $2", [
         hashedPassword,
         id,
      ]);

      res.json({ message: "Senha redefinida com sucesso." });
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao redefinir a senha." });
   }
});

// GET /users/list
router.get("/list", authenticateToken, async (req, res) => {
   try {
      const result = await pool.query(
         "SELECT id, name, email, phone, address, role FROM users ORDER BY id ASC"
      );
      res.json(result.rows);
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar usuários." });
   }
});

// GET /users/:id
router.get("/:id", authenticateToken, async (req, res) => {
   const { id } = req.params;

   try {
      // Só admin pode acessar outros usuários
      const requestingUser = await pool.query(
         "SELECT role FROM users WHERE id = $1",
         [req.user.id]
      );
      if (requestingUser.rows[0].role !== "admin") {
         return res.status(403).json({ error: "Acesso negado" });
      }

      const result = await pool.query(
         "SELECT id, name, email, phone, address, role FROM users WHERE id = $1",
         [id]
      );

      if (result.rows.length === 0)
         return res.status(404).json({ error: "Usuário não encontrado" });

      res.json({ user: result.rows[0] });
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro no servidor" });
   }
});

// users.js (Express)
router.delete("/delete/:id", authenticateToken, async (req, res) => {
   const { id } = req.params;
   try {
      const result = await pool.query(
         "DELETE FROM users WHERE id = $1 RETURNING *",
         [id]
      );
      if (result.rowCount === 0)
         return res.status(404).json({ error: "Usuário não encontrado." });

      res.json({ message: "Usuário excluído com sucesso." });
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao excluir usuário." });
   }
});

module.exports = router;
