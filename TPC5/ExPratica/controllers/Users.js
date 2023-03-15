var axios = require('axios')

module.exports.listall = () =>
{
    return axios.get("http://localhost:3000/users?_sort=nome")
        .then(response => {return response.data})
        .catch(error => {return error})
}

module.exports.insert = user =>
{
    return axios.post("http://localhost:3000/users", user)
        .then( response => { return response.data})
        .catch(error => {return error})
}