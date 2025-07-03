const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM eventos');
  res.json(rows);
});

router.post('/', async (req, res) => {
  if (req.user.role !== 'organizador') return res.status(403).json({ error: 'Acesso negado' });
  const { nome, data, local, descricao } = req.body;
  await db.query('INSERT INTO eventos (nome, data, local, descricao, id_organizador) VALUES (?, ?, ?, ?, ?)', 
    [nome, data, local, descricao, req.user.id]);
  res.status(201).json({ message: 'Evento criado' });
});

router.put('/:id', async (req, res) => {
  if (req.user.role !== 'organizador') return res.status(403).json({ error: 'Acesso negado' });
  const { nome, data, local, descricao } = req.body;
  await db.query('UPDATE eventos SET nome=?, data=?, local=?, descricao=? WHERE id=? AND id_organizador=?',
    [nome, data, local, descricao, req.params.id, req.user.id]);
  res.json({ message: 'Evento atualizado' });
});

router.delete('/:id', async (req, res) => {
  if (req.user.role !== 'organizador') return res.status(403).json({ error: 'Acesso negado' });
  await db.query('DELETE FROM eventos WHERE id=? AND id_organizador=?', [req.params.id, req.user.id]);
  res.json({ message: 'Evento removido' });
});

module.exports = router;