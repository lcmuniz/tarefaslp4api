const db = require('./db')
const express = require('express')
const router = express.Router()

router.use((req, res, next) => next())

router.get('/', (req, res) => {
    return res.send(db.autores.findAll())
})

router.get('/:id', (req, res) => {
    return res.send(db.autores.findById(req.params.id))
})

router.post('/', (req, res) => {    
    return res.send(db.autores.save(req.body))
})

router.delete('/:id', (req, res) => {    
    return res.send(db.autores.delete(req.params.id))
})

router.get('/:id/tarefas', (req, res) => {
    return res.send(db.autores.findAllTarefasByAutorId(req.params.id))
})

module.exports = router