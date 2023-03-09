function formUser()
{
    // 225px
    return `
    <form class="w3-container w3-padding" method="POST">
        <fieldset class="w3-light-grey">
            <legend>Form Utilizador</legend>
            <label>ID</label>
            <input class="w3-input w3-round-large w3-grey" type="text" name="id"/>
            <label>Nome</label>
            <input class="w3-input w3-round-large w3-grey" type="text" name="nome"/>
        </fieldset>
        <br/>
        <button class="w3-btn w3-round-xlarge w3-red" type="submit">Register User</button>
    </form>
    `
}

function formTask(listUser)
{
    pagHtml = `
    <form class="w3-container" method="POST">
        <fieldset class="w3-light-grey">
            <legend>Form Tarefas</legend>
            <label>ID</label>
            <input class="w3-input w3-round w3-grey" type="text" name="id"/>
            <label>Quem</label>
            <select class="w3-select w3-round w3-grey" name="who">`
    for(const user of listUser)
    {
        pagHtml += `
            <option value="${user.id}">${user.nome}</option>
        `    
    }
    
    pagHtml += `
            </select> 
            <label>O quê</label>
            <input class="w3-input w3-round w3-grey" type="text" name="what"/>
        </fieldset>
        <br/>
        <button class="w3-btn w3-round-xlarge w3-red" type="submit">Register Task</button>
    </form>
    `
    return pagHtml
}

function showTasks(lt, b, users)
{
    lt.sort((n1,n2) => users[n1.who].localeCompare(users[n2.who]))
    pagHtml = `
    <table class="w3-table w3-striped w3-bordered w3-centered">
        <tr class="w3-red">
            <td>ID</td>
            <td>Who</td>
            <td>What</td>`
    if(b)
        pagHtml += `       
            <td></td>`
    pagHtml += `</tr>`
    for(const elem of lt)
    {
        pagHtml += `
        <tr>
            <td>${elem.id}</td>
            <td>${users[elem.who]}</td>
            <td>${elem.what}</td>`
        if(b)
            pagHtml += `
            <td>
                <a class="w3-btn w3-round-xlarge w3-black w3-padding-small" href="/task/done/${elem.id}"><b>Done</b></a> 
                <a class="w3-btn w3-round-xlarge w3-black w3-padding-small" href="/task/edit/${elem.id}"><b>Edit</b></a>
            </td>
            `
        pagHtml += `</tr>`
    }
    return pagHtml + `</table>`
}


function showTasksTODO(listTasks,users)
{
    const lt = listTasks.filter(elem => elem.done == undefined)
    return showTasks(lt,true,users)
}

function showTasksDone(listTasks,users)
{
    const lt = listTasks.filter(elem => elem.done != undefined)
    return showTasks(lt,false,users)
}

exports.editTask = function editTask(task,listUser)
{
    var users = {}
    for(const u of listUser)
        users[u.id] = u.nome
    pagHtml = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Student Management</title>
        </head>
        <body>
        <div class="w3-card-4">
        <header class="w3-container w3-red">
            <h1>Editar Tarefa</h1>
        </header>
        <form class="w3-container" method="POST">
            <fieldset class="w3-light-grey">
                <legend>Editar Tarefa</legend>
                <label>ID</label>
                <input class="w3-input w3-round w3-grey" type="text" name="id" value="${task.id}" readonly/>
                <label>Quem</label>
                <select class="w3-select w3-round w3-grey" name="who">`
    for(const user of listUser)
    {
        if (user.id != task.who)
        {
            pagHtml += `
            <option value="${user.id}">${user.nome}</option>
        `    
        }
        else
        {
            pagHtml += `
            <option value="${user.id}" selected>${user.nome}</option>
        `    
        }
    }
    pagHtml += `
            </select> <label>O quê</label>
                <input class="w3-input w3-round w3-grey" type="text" name="what" value="${task.what}"/>
            </fieldset>
            <br/>
            <button class="w3-btn w3-round-xlarge w3-red" type="submit">Edit Task</button>
            <a class="w3-btn w3-round-xlarge w3-red" href="/">Voltar</a>
        </form>
        </div>
        </body>
    </html`
    return pagHtml
}

exports.showPage = function showPage(listusers,listtasks)
{   
    var users = {}
    for(const u of listusers)
        users[u.id] = u.nome
    pagHtml = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Student Management</title>
        </head>
        <body>
        <header class="w3-container w3-red">
            <h1>Gestor de tarefas</h1>
        </header>
        <div class="w3-container">
            <div class="w3-cell-row">
                <div class="w3-cell" style="width:60%">`
    pagHtml += formTask(listusers)
    pagHtml += `
                </div>
                <div class="w3-cell" style="width:40%"> `
    pagHtml += formUser()
    pagHtml += `
                </div>
            </div>
            <br />
            <div class="w3-cell-row">
                <div class="w3-cell"  style="width:45%">`
    pagHtml += showTasksTODO(listtasks,users)
    pagHtml += `</div>
                <div class="w3-cell"  style="width:10%">
                </div>
                <div class="w3-cell"  style="width:45%">`
    pagHtml += showTasksDone(listtasks,users)
    pagHtml += `
                </div>
            </div>
            </div>
        </body>
    </html>
    `
    return pagHtml
}

exports.sucessMessage = function sucessMessage(msg)
{
    pagHtml = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Student Management</title>
        </head>
        <body>
        <div>
            <header class="w3-container w3-red">
                <h1>Operação bem sucedida</h1>
            </header>
            <div class="w3-container ">
                <h3>${msg} realizado com sucesso</h3>
                <a class="w3-btn w3-round-xlarge w3-red" href="/">Voltar</a>
            </div>
        </div>
        </body>
    </html`
    return pagHtml
}