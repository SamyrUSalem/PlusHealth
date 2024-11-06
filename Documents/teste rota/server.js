const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 4500;

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cadastrodb',
    port: 4200
});

db.connect((err) => {
  if(err) {
    throw err;
  }
  console.log('Conexão com o banco de dados estabelecida');
});

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/cadastro', (req, res) => {

    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

    if (!nome || !email || !senha) {
        return res.status(400).send({ error: 'Dados de cadastro incompletos!' });
    }

    db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha], (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Erro ao inserir os dados no banco de dados!' });
        } else {
            res.status(200).send({ success: 'Usuário cadastrado com sucesso!', id: results.insertId });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    if (!email || !senha) {
        return res.status(400).send({ error: 'Dados de login incompletos!' });
    }

    db.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Erro ao consultar os dados no banco de dados!' });
        } else {
            if (results.length > 0) {
                res.status(200).send({ success: 'Login efetuado com sucesso!', user: results[0] });
            } else {
                res.status(401).send({ error: 'Email ou senha incorretos!' });
            }
        }
    });
});

