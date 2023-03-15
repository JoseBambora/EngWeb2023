var axios = require('axios')

module.exports.listall = () =>
{
    return axios.get("http://localhost:3000/tasks?_sort=nome")
        .then(response => {return response.data})
        .catch(error => {return error})
}

module.exports.insert = task =>
{
    return axios.post("http://localhost:3000/tasks", task)
        .then(response => { return response.data})
        .catch(error => {return error})
}

module.exports.get = taskid =>
{
    return axios.get(`http://localhost:3000/tasks/${taskid}`)
        .then(response => { return response.data})
        .catch(error => {return error})
}

module.exports.update = task =>
{
    return axios.put(`http://localhost:3000/tasks/${task.id}`,task)
        .then(response => { return response.data})
        .catch(error => {return error})
}