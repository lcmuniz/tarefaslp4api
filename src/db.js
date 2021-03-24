const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./db/db-tarefas', err => {
    if (err) {
        return console.error(err.message)
    }
    else {
        console.log('Connected to the database.')
    }
})

const dbAll = (...args) => {
    return new Promise((resolve, reject) => {
        db.all(...args, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}

const dbRun = (...args) => {
    return new Promise((resolve, reject) => {
        db.run(...args, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}

const dbGet = (...args) => {
    return new Promise((resolve, reject) => {
        db.get(...args, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}

const findAllTarefas = async () => {
    const sql = 'select * from tarefas order by texto'
    const res = await dbAll(sql, [])
    return res
}

const findTarefa = async (id) => {
    const sql = 'select * from tarefas where id = ' + id
    const res = await dbGet(sql, [])
    return res
}

const findAllAutores = async () => {
    const sql = 'select * from autores order by nome'
    const res = await dbAll(sql, [])
    return res
}

const findAutor = async (id) => {
    const sql = 'select * from autores where id = ' + id
    const res = await dbGet(sql, [])
    return res
}

module.exports = {
    tarefas:  {
        findAll: async () => {
            return await findAllTarefas()
        },
        findById: async (id) => {
            return await findTarefa(id)
        },
        save: async (tarefa) => {
            if (tarefa.id == undefined) {
                const sql = `insert into tarefas (texto, autor_id, completada) values ('${tarefa.texto}', '${tarefa.autor_id}', '${tarefa.completada}')`
                await dbRun(sql)
            }
            else {
                const tarefaBanco = await findAutor(tarefa.id)
                if (tarefaBanco) {
                    if(tarefa.texto) tarefaBanco.texto = tarefa.nome
                    if(tarefa.autor_id) tarefaBanco.autor_id = tarefa.autor_id
                    if(tarefa.completada) tarefaBanco.completada = tarefa.completada
                    const sql = `update tarefas set texto = '${tarefaBanco.texto}', autor_id = '${tarefaBanco.autor_id}', completada = '${tarefaBanco.completada}' where id = ${tarefaBanco.id}`
                    await dbRun(sql)
                }
            }
            return await findAllTarefas()
        },
        delete: async (id) => {
            const sql = `delete from tarefas where id = ` + id
            await dbRun(sql)
            return await findAllTarefas()
        },
    },
    autores:  {
        findAll: async () => {
            return await findAllAutores()
        },
        findById: async (id) => {
            return await findAutor(id)
        },
        findBy: async (email, senha) => {
            const sql = `select * from autores where email = '${email}' and senha = '${senha}'`
            const res = await dbGet(sql, [])
            return res
        },
        save: async (autor) => {
            if (autor.id == undefined) {
                const sql = `insert into autores (nome, email, senha) values ('${autor.nome}', '${autor.email}', '${autor.senha}')`
                await dbRun(sql)
            }
            else {
                const autorBanco = await findAutor(autor.id)
                if (autorBanco) {
                    if(autor.nome) autorBanco.nome = autor.nome
                    if(autor.email) autorBanco.email = autor.email
                    if(autor.senha) autorBanco.senha = autor.senha
                    const sql = `update autores set nome = '${autorBanco.nome}', email = '${autorBanco.email}', senha = '${autorBanco.senha}' where id = ${autorBanco.id}`
                    await dbRun(sql)
                }
            }
            return await findAllAutores()
        },
        delete: async (id) => {
            const sql = `delete from autores where id = ` + id
            await dbRun(sql)
            return await findAllAutores()
        },
        findAllTarefasByAutorId: async (id) => {
            const sql = `select * from tarefas where autor_id = ${id} order by texto`
            const res = await dbAll(sql, [])
            return res
        }
    }
}