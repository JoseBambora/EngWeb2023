var http = require('http')
var url = require('url')
var fs = require('fs')

function writeHtmlPage(page, res)
{
    filename = page + '.html'
    fs.readFile('../pages/' + filename, function (err, data) 
    {
        res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'});
        if(err)
        {
            console.log('Ficheiro não existe')
            res.write("Erro na leitura " + err)
        }
        else
        {
            console.log('A escrever o ficheiro ' + filename)
            res.write(data)
        }
        res.end();
    })
}



var meuServer = http.createServer(function (req,res) {
    var pedido = url.parse(req.url,true).pathname
    console.log(req.method + " " + req.url)
    if(pedido == '/' || pedido == '/index')
    {
        console.log('Pedido index')
        writeHtmlPage('index',res)
    }
    else if(pedido[1] == 'c')
    {
        console.log('Pedido página')
        writeHtmlPage(pedido.substring(1),res)
    }
})

var porta = 5555
meuServer.listen(porta)

console.log('Servidor à escuta na porta ' + porta + ' ...');

