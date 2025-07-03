const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  if (req.user.role !== 'organizador') return res.status(403).json({ error: 'Acesso negado' });
  const [rows] = await db.query('SELECT id, nome, email, role FROM usuarios');
  res.json(rows);
});

module.exports = router;