const express = require('express')
const db = require('./db')
const tarefas = require('./tarefas')
const autores = require('./autores')
const cors = require('cors');

const app = express()

app.use(express.json())

app.use(cors({origin: '*'}));

app.get('/', (req, res) => {
    res.send({version: 1.0})
})

app.use('/tarefas', tarefas)

app.use('/autores', autores)

app.listen(8888, () => {
    console.log('Server listening on port 8080')
})