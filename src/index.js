require("dotenv-safe").config();

const express = require('express')
const db = require('./db')
const auth = require('./auth')
const tarefas = require('./tarefas')
const autores = require('./autores')
const cors = require('cors');
const createSchema = require('./schema')
const {verifyJWT} = require('./security')

const app = express()

app.use(express.json())

app.use(cors({origin: '*'}));

app.get('/', (req, res) => {
    res.send({version: 1.0})
})

app.post('/schema/create', verifyJWT, async (req, res) => {
    try {
        const msg = await createSchema(false)
        res.send(msg)
    }
    catch(err) {
        res.status(400).send(err)   
    }
})

app.post('/schema/recreate', verifyJWT, async (req, res) => {
    const msg = await createSchema(true)
    res.send(msg)
})

app.use('/tarefas', verifyJWT, tarefas)

app.use('/autores', verifyJWT, autores)

app.use('/auth', auth)


app.listen(8888, () => {
    console.log('Server listening on port 8888')
})