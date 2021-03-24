const db = require('./db')
const express = require('express')
const router = express.Router()

router.use((req, res, next) => next())

router.get('/', async (req, res) => {
    return res.send(await db.autores.findAll())
})

router.get('/:id', async (req, res) => {
    return res.send(await db.autores.findById(req.params.id))
})

router.post('/', async (req, res) => {    
    return res.send(await db.autores.save(req.body))
})

router.delete('/:id', async (req, res) => {    
    return res.send(await db.autores.delete(req.params.id))
})

router.get('/:id/tarefas', async (req, res) => {
    return res.send(await db.autores.findAllTarefasByAutorId(req.params.id))
})

module.exports = router