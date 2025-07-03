const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const eventoRoutes = require('./routes/eventoRoutes');
const jwtMiddleware = require('./middlewares/jwtMiddleware');
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/eventos', jwtMiddleware, eventoRoutes);
app.use('/usuarios', jwtMiddleware, usuarioRoutes);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));