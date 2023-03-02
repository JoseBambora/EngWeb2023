const fs = require('fs')
const http = require('http')
const utf8 = require('utf8');
const mypages = require('./mypages')
const axios = require('axios')

var opcoes = [
                {'link':"http://localhost:7777/pessoas", 'name':'Listam de pessoas'},
                {'link':"http://localhost:7777/distsex", 'name':"Distribuição por sexo"},
                {'link':"http://localhost:7777/distdesp", 'name':"Distribuição por desporto"},
                {'link':"http://localhost:7777/top10pro", 'name':"Top 10 de profissões"}
            ]

http.createServer(function (req,res){
    var d = new Date().toISOString().substring(0,16);
    console.log(req.method + " " + req.url + " " + d)
    if(req.method == 'GET')
    {
        if(req.url == '/w3.css')
        {
            fs.readFile('w3.css', function (err, data) 
            {
                res.writeHead(200, {'Content-Type': 'text/css'})
                if(err)
                    res.write("Erro na leitura " + err)
                else
                    res.write(data)
                res.end()
            })
        }
        else if(req.url == '/pessoas' || req.url.toLowerCase() == "/ordasc" || req.url.toLowerCase() == "/orddesc")
        {
            axios.get('http://localhost:3000/pessoas')
            .then(result =>
            {
                var pessoas = result.data
                pessoas.sort((a, b) =>
                {
                    var k = 1;
                    if(ord)
                        k = -1;
                    return k * a.nome.localeCompare(b.nome)
                });
                var frase = "Recuperei " + pessoas.length + " registos."
                console.log(frase)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                var ord = req.url.toLowerCase() == "/orddesc"
                res.end(mypages.getMainPage(pessoas,d,ord))
            })
            .catch(erro =>
            {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end("<p>"+erro+"</p>")
            })
        }
        else if(req.url == "/top10pro")
        {
            axios.get('http://localhost:3000/pessoas')
            .then(result =>
            {
                console.log('Pedido de top 10 profissões')
                var pessoas = result.data
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end(mypages.getTop10Jobs(pessoas,d))
            })
            .catch(erro =>
            {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end("<p>"+erro+"</p>")
            })
        }
        else if (req.url.match(/p\d+/))
        {
            axios.get('http://localhost:3000/pessoas/' + req.url.substring(9))
            .then(result =>
            {
                var pessoa = result.data
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end(mypages.getPersonPage(pessoa,d))
            })
            .catch(erro =>
            {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end("<p>"+erro+"</p>")
            })    
        }
        else if(req.url == '/')
        {
            console.log('Pedido de opções')
            res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
            res.end(mypages.getOptionsPage(opcoes,d))
        }
        else if(req.url == '/distsex')
        {
            axios.get('http://localhost:3000/pessoas')
            .then(result =>
            {
                console.log('Pedido de distribuição por sexo')
                var pessoas = result.data
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end(mypages.getDistSexo(pessoas,d))
            })
            .catch(erro =>
            {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end("<p>"+erro+"</p>")
            })
        }
        else if(req.url == "/distdesp")
        {
            axios.get('http://localhost:3000/pessoas')
            .then(result =>
            {
                console.log('Pedido de distribuição por desporto')
                var pessoas = result.data
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end(mypages.getDistSport(pessoas,d))
            })
            .catch(erro =>
            {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end("<p>"+erro+"</p>")
            })
        }
        else if(req.url.match(/sex\/.+/))
        {
            console.log("pedido sexo")
            // /pessoas/sex/
            axios.get('http://localhost:3000/pessoas')
            .then(result =>
            {
                var sex = decodeURIComponent(req.url.substring(13))
                console.log('Pedido de pessoas do sexo '+ sex)
                var pessoas = result.data
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end(mypages.getPeopleSex(pessoas,d,sex))
            })
            .catch(erro =>
            {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end("<p>"+erro+"</p>")
            })
        }
        else if(req.url.match(/sport\/.+/))
        {

            // /pessoas/sports/
            axios.get('http://localhost:3000/pessoas')
            .then(result =>
            {
                var sport = decodeURIComponent(req.url.substring(15))
                console.log('Pedido de pessoas que praticam ' + sport)
                var pessoas = result.data
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end(mypages.getPeopleSport(pessoas,d,sport))
            })
            .catch(erro =>
            {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end("<p>"+erro+"</p>")
            })
        }
        else if(req.url.match(/job\/.+/))
        {
            // /pessoas/jobs/
            axios.get('http://localhost:3000/pessoas')
            .then(result =>
            {
                var job = decodeURIComponent(req.url.substring(13))
                console.log('Pedido de pessoas cujo trabalho é ' + job)
                var pessoas = result.data
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end(mypages.getPeopleProf(pessoas,d,job))
            })
            .catch(erro =>
            {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end("<p>"+erro+"</p>")
            })
        }
        else
        {
            res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
            res.end("<p>Pedido inválido</p>")
        }
    }
}).listen(7777)

console.log('Servidor à escuta na porta 7777...');