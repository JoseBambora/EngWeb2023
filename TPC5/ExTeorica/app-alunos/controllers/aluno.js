var axios = require('axios')

// Obter a lista de estudantes
module.exports.list = () => {
    return axios.get("http://localhost:3000/alunos?_sort=nome")
    .then(response => { return response.data })
    .catch(erro => { return erro })
}


module.exports.getAluno = (id) => {
    return axios.get(`http://localhost:3000/alunos/${id}`)
    .then(response => { return response.data })
    .catch(erro => { return erro })
}


/**
 * Pegar na template da página do aluno e metê-la no pug
 */
