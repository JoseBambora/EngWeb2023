const http = require('http')
const axios = require('axios')
const templates = require('./template.js')
const static = require('./static.js')
const { parse } = require('querystring');

function addUser(res,result)
{
    axios.post("http://localhost:3000/users", result)
    .then( response => {
        let a = response.data
        // Add code to render page with the student record
        showTasks(res)   
    })
    
}

function addTask(res,result)
{
    axios.post("http://localhost:3000/tasks" ,result)
    .then( response => {
        let a = response.data
        // Add code to render page with the student record
        showTasks(res)   
    })
}

function getUsers()
{
    return axios.get("http://localhost:3000/users/")
    .then(res => 
        {
            return res.data
        })
}
function getTasks()
{
    return axios.get("http://localhost:3000/tasks/")
    .then(res => 
        {
            return res.data
        })
}

function showTasks(res)
{
    getTasks()
    .then(tasks =>
    {
        getUsers()
        .then(users =>
        {
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.end(templates.showPage(users,tasks))
        })
    })
}

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

function saveEdit(req,res,task)
{
    collectRequestBodyData(req, result => 
    {
        if(result)
        {
            axios.put("http://localhost:3000/tasks/" + task,result)
            .then( result =>
                {
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.end(templates.sucessMessage('Edição da task' + task ))           
                }
            )
        }
    })
}


function editTask(res,task)
{
    axios.get("http://localhost:3000/tasks/" + task)
    .then( result =>
        {
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.end(templates.editTask(result.data))
        }
    )
    
}

function doneTask(res,task)
{ 
    axios.get("http://localhost:3000/tasks/" + task)
    .then( result =>
    {
        result.data['done'] = 0
        axios.put("http://localhost:3000/tasks/" + task, result.data)
        .then( ignore =>
            {
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.end(templates.sucessMessage('Done da task' + task ))     
            }
        )
    }
)
}

function addUserTask(req,res)
{
    collectRequestBodyData(req, result => 
    {
        if(result)
        {
            if(result.who != undefined)
                addTask(res,result)
            else 
                addUser(res,result)
        }
    })
}

var server = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    if(static.staticResource(req))
    {
        static.serveStaticResource(req, res)
    }
    else
    {
        switch(req.method)
        {
            case "GET":
                if(req.url == "/")
                {
                    showTasks(res)
                }
                else if(/\/task\/edit\/.+/.test(req.url))
                {
                    var task = decodeURIComponent(req.url.split('/')[3])
                    console.log('Edit task ' +task)
                    editTask(res,task)
                }
                else if(/\/task\/done\/.+/.test(req.url))
                {
                    var task = decodeURIComponent(req.url.split('/')[3])
                    console.log('Edit done ' + task)
                    doneTask(res,task)
                }
                break
            case "POST":
                if(req.url == '/')
                {
                    addUserTask(req,res)
                }
                else if(/\/task\/edit\/.+/.test(req.url))
                {
                    var task = req.url.split('/')[3]
                    saveEdit(req,res,task)
                }
                break
        }
    } 
})

port = 7777

server.listen(port)
console.log(`Servidor à escuta porta ${port}...`)