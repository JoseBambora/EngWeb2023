var mongoose = require('mongoose')
var mongoDB = 'mongodb://127.0.0.1/EngWeb2023'
mongoose.connect(mongoDB,{useNewUrlParser: true, useUnifiedTopology: true})
var studentSchema = new mongoose.Schema({
    _id : String,
    nome : String,
    gitlink: String,
    tpc1: String,
    tpc2: String,
    tpc3: String,
    tpc4: String,
    tpc5: String,
    tpc6: String,
    tpc7: String,
    tpc8: String
})
var studentModel = mongoose.model('student',studentSchema)

// Obter a lista de estudantes
module.exports.list = () => {
    // studentModel.create(students)
    return studentModel.find()
    .then(data =>
    {
        res = []
        for (elem of data)
        {
            res.push(elem._doc)
        }
        return data
    })
    .catch(erro => {return erro})
}


module.exports.getAluno = (id) => {
    return studentModel.findOne({_id: id})
    .then(data =>
    {
        console.log(data)
        return data
    })
    .catch(erro => {return erro})
}

/**
 * Pegar na template da página do aluno e metê-la no pug
 */
