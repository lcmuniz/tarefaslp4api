const db = require('./db')
const express = require('express')
const router = express.Router()

router.use((req, res, next) => next())

router.get('/', async (req, res) => {
    return res.send(await db.tarefas.findAll())
})

router.get('/:id', async (req, res) => {
    return res.send(await db.tarefas.findById(req.params.id))
})

router.post('/', async (req, res) => {    
    return res.send(await db.tarefas.save(req.body))
})

router.delete('/:id', async (req, res) => {    
    return res.send(await db.tarefas.delete(req.params.id))
})

module.exports = router