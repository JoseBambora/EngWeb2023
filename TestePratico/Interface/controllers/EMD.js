const axios = require('axios')


module.exports.listall = () => {
    return axios.get('http://localhost:7777/api/emd2')
    .then(data => {return data.data})
    .catch(error => {return error})
}

module.exports.get = (id) => {
    return axios.get('http://localhost:7777/api/emd/'+id)
    .then(data => {return data.data})
    .catch(error => {return error})
}