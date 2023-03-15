var express = require('express');
var router = express.Router();
var Tasks = require('../controllers/Tasks')
var Users = require('../controllers/Users')

/* GET home page. */
router.get('/', function(req, res, next){
    Tasks.listall()
    .then(tasks =>
    {
        Users.listall()
        .then(users =>
        {
            var dictnames = {}
            users.forEach(elem => dictnames[elem.id] = elem.nome)
            tasks.sort((u1,u2) => dictnames[u1.who].localeCompare(dictnames[u2.who]))
            var toDo = tasks.filter(elem => elem.done == undefined)
            var done = tasks.filter(elem => elem.done != undefined)
            res.render('index', { listUser:  users, todo: toDo, done: done, dictnames: dictnames});
        })  
        .catch(erro => {res.render('error', {error: erro, message:'Erro ao obter a lista de users 123'})})

    })  
    .catch(erro => {res.render('error', {error: erro, message:'Erro ao obter a lista de tasks'})})
})

router.get('/task/edit/:tid', function(req, res, next){
    Tasks.get(req.params.tid)
    .then( t => 
        {
            Users.listall()
            .then(users =>
            {
                res.render('editTask', { listUser:  users, task: t});
            })
        }
    )    
    .catch(erro => {res.render('error', {error: erro, message:'Erro ao obter a lista de tasks'})})
    
})

router.get('/task/done/:tid', function(req, res, next){
    Tasks.get(req.params.tid)
    .then(t => 
        {
            res.render('confirmDone', { task: t});
        })  
    .catch(erro => {res.render('error', {error: erro, message:'Erro ao obter a lista de tasks'})})
})

router.post('/',function(req, res, next){
    var data = req.body
    if(data.who)
    {
        Tasks.insert(data)
        .then(result => res.redirect('/'))    
        .catch(erro => {res.render('error', {error: erro, message:'Erro ao obter a lista de tasks'})})

    }
    else
    {
        Users.insert(data)
        .then(result => res.redirect('/'))    
        .catch(erro => {res.render('error', {error: erro, message:'Erro ao obter a lista de tasks'})})
    }
})

router.post('/task/edit/:tid', function(req, res, next){
    Tasks.update(req.body)
    .then( _ => res.redirect("/"))    
    .catch(erro => {res.render('error', {error: erro, message:'Erro ao obter a lista de tasks'})})
    
})

router.post('/task/done/:tid' ,function(req, res, next){
    Tasks.get(req.params.tid)
    .then( t => 
    {
        t['done'] = 1
        return Tasks.update(t)
        .then( _ =>
            {
                res.redirect("/")
            }
        )
    }
    )    
    .catch(erro => {res.render('error', {error: erro, message:'Erro ao obter a lista de tasks'})})
    

})

module.exports = router;
