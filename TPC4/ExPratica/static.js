
var fs = require('fs')
const directory = 'public/'

function staticResource(request){
    res = request.url.split('/')
    files = fs.readdirSync(directory)
    return files.includes(res[res.length-1])
}

exports.staticResource = staticResource

function serveStaticResource(req, res){
    var partes = req.url.split('/')
    var file = partes[partes.length -1 ]
    fs.readFile('public/' + file, (erro, dados)=>{
        if(erro){
            console.log('Erro: ficheiro não encontrado ' + erro)
            res.statusCode = 404
            res.end('Erro: ficheiro não encontrado ' + erro)
        }
        else{
            if(/.*\.ico$/.test(file)){
                res.setHeader('Content-Type', 'image/x-icon')
                res.end(dados)
            }
            else if(/.*\.css$/.test(file)){
                res.setHeader('Content-Type', 'text/css')
                res.end(dados)
            }
            // PNG images
            else{
                res.setHeader('Content-Type', 'image/png')
                res.end(dados)
            }    
        }
    })
}

exports.serveStaticResource = serveStaticResource