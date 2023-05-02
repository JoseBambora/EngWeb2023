const EMD = require('../models/EMD')


module.exports.list = () => {
    return EMD.find({},{_id:1,nome:1,dataEMD:1,resultado:1}).sort({'nome.primeiro':1,'nome.último':1})
    .then(data => {return data})
    .catch(error => {return error})
}

module.exports.get = (id) => {
    return EMD.find({_id:id})
    .then(data => {return data})
    .catch(error => {return error})
}

module.exports.modalidades = () => {
    return EMD.distinct('modalidade').sort()
    .then(data => {return data})
    .catch(error => {return error})
}

module.exports.listResTrue = () => {
    return EMD.find({resultado:true}).sort({'nome.primeiro':1,'nome.último':1})
    .then(data => {return data})
    .catch(error => {return error})
}

module.exports.listMod = (mod) => {
    return EMD.find({modalidade:mod}).sort({'nome.primeiro':1,'nome.último':1})
    .then(data => {return data})
    .catch(error => {return error})
}

module.exports.atletasfem = () => {
    return EMD.find({género:'F'}).sort({'nome.primeiro':1,'nome.último':1})
    .then(data => {return data})
    .catch(error => {return error})
}

module.exports.atletasClub = (club) => {
    return EMD.find({clube:club}).sort({'nome.primeiro':1,'nome.último':1})
    .then(data => {return data})
    .catch(error => {return error})
}



module.exports.list2 = () => {
    return EMD.find({},{_id:1,nome:1,dataEMD:1,resultado:1,género:1,idade:1}).sort({'nome.primeiro':1,'nome.último':1})
    .then(data => {return data})
    .catch(error => {return error})
}