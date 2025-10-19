const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Conexão com MongoDB local (substitua a string se usar Atlas)
mongoose.connect('mongodb://127.0.0.1:27017/meubanco', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado!'))
.catch((err) => console.error('Erro ao conectar:', err));

// Definição do schema e modelo
const UsuarioSchema = new mongoose.Schema({
  nome: String,
  email: String
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

// Rota para criar usuário
app.post('/usuarios', async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).send(usuario);
  } catch(error) {
    res.status(400).send(error);
  }
});

// Rota para listar usuários
app.get('/usuarios', async (req, res) => {
  const usuarios = await Usuario.find();
  res.send(usuarios);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
