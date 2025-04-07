require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rota GET pra listar os leads
app.get('/leads', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./server.json'));
  res.json(data);
});

// Rota POST pra adicionar novo lead
app.post('/leads', (req, res) => {
  const novoLead = req.body;
  const data = JSON.parse(fs.readFileSync('./server.json'));

  data.lead.push(novoLead);

  fs.writeFileSync('./server.json', JSON.stringify(data, null, 2));
  res.status(201).json({ mensagem: 'Lead salvo com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});