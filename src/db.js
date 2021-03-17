let autores = [
    {id: 1, nome: 'Luiz Carlos'},
    {id: 2, nome: 'Maria Silva'},
    {id: 3, nome: 'Sandra Rosa Madalena'}
]
let tarefas = [
    {id: 1, texto: 'Minha primeira tarefa', autor_id: 1, completada: false},
    {id: 2, texto: 'Minha segunda tarefa', autor_id: 1, completada: false},
    {id: 3, texto: 'Minha terceira tarefa', autor_id: 2, completada: true},
    {id: 4, texto: 'Minha quarta tarefa', autor_id: 2, completada: true},
    {id: 5, texto: 'Minha quinta tarefa', autor_id: 3, completada: false}
]

module.exports = {
    tarefas:  {
        findAll: () => {
            return tarefas.sort((a, b) => a.texto.localeCompare(b.texto))
        },
        findById: (id) => {
            return tarefas.filter(t => t.id == id)[0]
        },
        save: (tarefa) => {
            if (tarefa.id == undefined) tarefa.id = tarefas.length + 1
            const temp = tarefas.filter(t => t.id != tarefa.id)
            tarefas = [...temp, tarefa]
            return tarefas
        },
        delete: (id) => {
            tarefas  = tarefas.filter(t => t.id != id)        
            return tarefas;
        },
    },
    autores:  {
        findAll: () => {
            return autores.sort((a, b) => a.nome.localeCompare(b.nome))
        },
        findById: (id) => {
            return autores.filter(a => a.id == id)[0]
        },
        save: (autor) => {
            if (autor.id == undefined) autor.id = autores.length + 1
            const temp = autores.filter(a => a.id != autor.id)
            console.log(temp)
            autores = [...temp, autor]
            return autores
        },
        delete: (id) => {
            autores  = autores.filter(a => a.id != id)        
            return autores;
        },
        findAllTarefasByAutorId: (id) => {
            return tarefas.filter(t => t.autor_id == id)        
        }
    }
}