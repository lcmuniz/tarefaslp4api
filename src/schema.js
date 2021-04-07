const {encryptPassword} = require('./security')

const createSchema = async (recriar) => {
    const sqlite3 = require('sqlite3').verbose()

    const db = new sqlite3.Database('./db/db-tarefas', err => {
        if (err) {
            return console.error(err.message)
        }
        else {
            console.log('Connected to the database.')
        }
    })

    const dbRun = (...args) => {
        return new Promise((resolve, reject) => {
            db.run(...args, (err, data) => {
                if (err) return reject(err)
                resolve(data)
            })
        })
    }

    const resp = {}
    if (recriar) {
        await dbRun('drop table if exists autores')
        await dbRun('drop table if exists tarefas')
        resp.msg_deleted  = 'Schema deleted.'
    }

    await dbRun('create table autores (id integer primary key autoincrement, nome text, email text, senha text)')
    await dbRun('create table tarefas (id integer primary key autoincrement, texto text, autor_id integer, completada text)')
    await dbRun(`insert into autores (nome, email, senha) values ('admin','admin@gmail.com','${encryptPassword('admin')}')`)
    resp.msg_created  ='Schema created.'
    return resp
}

module.exports = createSchema