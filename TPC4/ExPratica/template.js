function formUser()
{
    return `
    <form class="w3-container" method="POST">
        <fieldset>
            <legend>Form Utilizador</legend>
            <label>ID</label>
            <input class="w3-input w3-round" type="text" name="id"/>
            <label>Nome</label>
            <input class="w3-input w3-round" type="text" name="name"/>
        </fieldset>
        <br/>
        <button class="w3-btn w3-round-xlarge w3-red" type="submit">Register User</button>
    </form>
    `
}

function formTask(listUser)
{
    return `
    <form class="w3-container" method="POST">
        <fieldset>
            <legend>Form Tarefas</legend>
            <label>ID</label>
            <input class="w3-input w3-round" type="text" name="id"/>
            <label>Quem</label>
            <input class="w3-input w3-round" type="text" name="who"/>
            <label>O quê</label>
            <input class="w3-input w3-round" type="text" name="what"/>
        </fieldset>
        <br/>
        <button class="w3-btn w3-round-xlarge w3-red" type="submit">Register Task</button>
    </form>
    `
}

function showTasks(lt, b)
{
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
            <td>${elem.who}</td>
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


function showTasksTODO(listTasks)
{
    const lt = listTasks.filter(elem => elem.done == undefined)
    return showTasks(lt,true)
    /*`
    <ul class="w3-ul w3-border">
        <li class="w3-red"><h2>Tarefas a fazer </h2></li>
        <li>  </li>
        <li>Sei la <button class="w3-btn w3-round-xlarge w3-black" href="/">Done</button> <button class="w3-btn w3-round-xlarge w3-black" href="/">Edit</button> </li>
        <li>Sei la <button class="w3-btn w3-round-xlarge w3-black" href="/">Done</button> <button class="w3-btn w3-round-xlarge w3-black" href="/">Edit</button> </li>
    </ul>
    `
    */
}

function showTasksDone(listTasks)
{
    const lt = listTasks.filter(elem => elem.done != undefined)
    return showTasks(lt,false)
}

exports.editTask = function editTask(task)
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
        <div class="w3-card-4">
        <form class="w3-container" method="POST">
            <fieldset>
                <legend>Form Tarefas</legend>
                <label>ID</label>
                <input class="w3-input w3-round" type="text" name="id" value="${task.id}" readonly/>
                <label>Quem</label>
                <input class="w3-input w3-round" type="text" name="who" value="${task.who}"/>
                <label>O quê</label>
                <input class="w3-input w3-round" type="text" name="what" value="${task.what}"/>
            </fieldset>
            <br/>
            <button class="w3-btn w3-round-xlarge w3-red" type="submit">Edit Task</button>
        </form>
        </div>
        </body>
    </html`
    return pagHtml
}

exports.showPage = function showPage(listusers,listtasks)
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
        <div class="w3-card-4">
            <header class="w3-container w3-amber">
                <h1>Gestor de tarefas</h1>
            </header>
            <table>
                <tr >
                    <td>`
    pagHtml += formTask(listusers)
    pagHtml += `
                    </td>
                    <td>`
    pagHtml += formUser()
    pagHtml += `
                    </td>
                </tr>
                <tr>
                    <td valign="top">`
    pagHtml += showTasksTODO(listtasks)
    pagHtml += `
                    </td>
                    <td valign="top">`
    pagHtml += showTasksDone(listtasks)
    pagHtml += `
                    </td>
                </tr>
            </table>
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
        <div class="w3-card-4">
            <p>${msg} realizado com sucess</p>
            <a class="w3-btn w3-round-xlarge w3-red" href="/">Voltar</a>
        </div>
        </body>
    </html`
    return pagHtml
}