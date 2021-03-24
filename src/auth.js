const express = require('express')
const jwt = require('jsonwebtoken');
const db = require('./db')
const {cryptoSenha} = require('./security')

const router = express.Router()

router.use((req, res, next) => next())

router.get('/login', async (req, res) => {
    const {email, senha} = req.body
    const autor = await db.autores.findBy(email, cryptoSenha(senha))
    if(autor){
        //auth ok
        const id = autor.id; //esse id viria do banco de dados
        const token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: 300 // expires in 5min
        });
        delete autor.senha
        return res.json({ autor, auth: true, token: token });
      }
      res.status(500).json({message: 'Login inválido!'});
})

module.exports = router