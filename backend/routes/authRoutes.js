const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const SECRET = 'seusecret';

router.post('/register', async (req, res) => {
  const { nome, email, senha, role } = req.body;
  const hashed = await bcrypt.hash(senha, 10);
  await db.query('INSERT INTO usuarios (nome, email, senha, role) VALUES (?, ?, ?, ?)', [nome, email, hashed, role || 'participante']);
  res.status(201).json({ message: 'Usuário registrado' });
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
  const user = rows[0];
  if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });
  const match = await bcrypt.compare(senha, user.senha);
  if (!match) return res.status(401).json({ error: 'Senha incorreta' });
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;