var express = require('express');
var Person = require('../controllers/person')
var router = express.Router();

/* GET home page. */
router.get('/people', function(req, res, next) {
  Person.list()
  .then(data => res.json(data))
  .catch(erro => res.json(erro))
  
});

router.get('/person/:id', function(req, res, next) {
  Person.getPerson(req.params.id)
  .then(data => res.json(data))
  .catch(erro => res.json(erro))
  
});

router.post('/person', function(req, res, next) {
  Person.addPerson(req.body)
  .then(data => res.status(201).json(data))
  .catch(erro => res.status(603).json(erro))
});

router.put('/person/:id', function(req, res, next) {
  Person.updatePerson(req.body)
  .then(data => res.json(data))
  .catch(erro => res.status(604).res.json(erro))
});

router.delete('/person/:id', function(req, res, next) {
  Person.deletePerson(req.params.id)
  .then(data => res.json(data))
  .catch(erro => res.json(erro))
});




module.exports = router;
/*
1. analisar a informação do data set
2. criar uma api de dados (tal como esta aplicação)
3. prog em qualquer linguagens que faz o import do dataset na base de dados usando a api
*/
