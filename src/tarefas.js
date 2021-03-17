const db = require('./db')
const express = require('express')
const router = express.Router()

router.use((req, res, next) => next())

router.get('/', (req, res) => {
    return res.send(db.tarefas.findAll())
})

router.get('/:id', (req, res) => {
    return res.send(db.tarefas.findById(req.params.id))
})

router.post('/', (req, res) => {    
    return res.send(db.tarefas.save(req.body))
})

router.delete('/:id', (req, res) => {    
    return res.send(db.tarefas.delete(req.params.id))
})

module.exports = router