var express = require('express');
var router = express.Router();
var EMD = require('../controllers/EMD')

function aux(emd){
  emd.nome = emd.nome.primeiro + ' ' + emd.nome.último
  return emd
}

/* GET home page. */
router.get('/', function(req, res, next) {
  EMD.listall()
  .then(data => { data2 = data.map(elem => aux(elem)); res.render('index', { dados: data2 })})
  .catch(error => res.render('error', {error : error}))
  
});


/* GET home page. */
router.get('/:id', function(req, res, next) {
  EMD.get(req.params.id)
  .then(data => { console.log(data); data2 = aux(data[0]); console.log(data2); res.render('emd', { dados: data2 })})
  .catch(error => res.render('error', {error : error}))
  
});

module.exports = router;
