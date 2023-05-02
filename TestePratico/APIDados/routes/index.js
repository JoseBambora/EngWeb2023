var express = require('express');
var router = express.Router();
var EMD = require('../controllers/EMD')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*

    GET /api/emd - Devolve a lista de EMD apenas com os campos "id", "nome", "data" e "resultado";
    GET /api/emd/:id - Devolve a informação completa de um EMD;
    GET /api/modalidades - Devolve a lista de modalidades, sem repetições;
    GET /api/emd?res=OK - Devolve a lista de EMD com resultado "true";
    GET /api/emd?modalidade=X - Devolve a lista de EMD referentes à modalidade passada como parâmetro, X;
    GET /api/atletas?gen=F - Devolve uma lista ordenada alfabeticamente com os nomes dos atletas de género feminino;
    GET /api/atletas?clube=X - Devolve uma lista ordenada alfabeticamente com os nomes dos atletas do clube X.

*/

router.get('/api/emd/:id', function(req, res, next) {
  EMD.get(req.params.id)
  .then(data =>   res.json(data))
  .catch(error => res.json({erro : error}))
});

router.get('/api/emd2', function(req, res, next) {
  EMD.list2()
  .then(data =>   res.json(data))
  .catch(error => res.json({erro : error}))
});

router.get('/api/modalidades', function(req, res, next) {
  EMD.modalidades()
  .then(data =>   res.json(data))
  .catch(error => res.json({erro : error}))
});

router.get('/api/emd', function(req, res, next) {
  query = req.query
  if(!query.res && !query.modalidade)
  {
    EMD.list()
    .then(data =>   res.json(data))
    .catch(error => res.json({erro : error}))
  }
  else if(query.res)
  {
    EMD.listResTrue()
    .then(data =>   res.json(data))
    .catch(error => res.json({erro : error}))
  }
  else
  {
    EMD.listMod(query.modalidade)
    .then(data =>   res.json(data))
    .catch(error => res.json({erro : error}))
  }
});

router.get('/api/atletas', function(req, res, next) {
  query = req.query
  if(query.gen)
  {
    EMD.atletasfem()
    .then(data =>   res.json(data))
    .catch(error => res.json({erro : error}))
  }
  else
  {
    EMD.atletasClub(query.clube)
    .then(data =>   res.json(data))
    .catch(error => res.json({erro : error}))
  }
});

module.exports = router;
