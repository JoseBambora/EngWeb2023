import json

def ordcidade(elem):
    return elem["nome"]

f = open("mapa.json")
mapa = json.load(f)
# lista de dicionários
cidades = mapa["cidades"]
cidades.sort(key=ordcidade)

idnomes = {}
for c in cidades:
    id = c['id']
    idnomes[id] = c['nome']

ligacoes = mapa["ligações"]

lig = {}

for l in ligacoes:
    o = l['origem']
    d = l['destino']
    dis = l['distância']
    if not lig.__contains__(o):
        lig[o] = []
    if not lig.__contains__(d):
        lig[d] = []
    lig[o].append((d,dis))
    lig[d].append((o,dis))

def fun(elem):
    return idnomes[elem[0]]

for con in lig.values():
    con.sort(key=fun)

paginahtml = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="UTF-8"/>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tr>
                <!--Coluna do índice -->
                <td width="30%" valign="top">
                    <a name="indice"></a>
                    <h3>Índice</h3>
                    <ol>"""

for c in cidades:
    paginahtml += f"""
                        <li><a href='#{c['id']}'>{c['nome']}</a></li>"""

paginahtml += """
                    </ol>
                </td>
                <!--Coluna do conteúdo -->
                <td width="70%">"""
for c in cidades:
    con = lig[c['id']]
    paginahtml += f"""
                <a name="{c['id']}"></a>
                <h3>{c['nome']}</h3>
                <p><b>Distrito:</b> {c["distrito"]}</p>
                <p><b>População:</b> {c["população"]}</p>
                <p><b>Descrição:</b> {c["descrição"]}</p>
                <p><h4>Ligações:</h4>
                    <ul>"""
    for connection in con:
        paginahtml += f"""
                        <li><a href="#{connection[0]}">{idnomes[connection[0]]}</a>: {connection[1]}</li>"""
    paginahtml += f"""
                    </ul>
                    </p>
                <adress>[<a href="#indice">Voltar ao Indice</a>]</a>
                <center>
                    <hr width="80%"/>
                </center>
    """

paginahtml+=  """
                </td>
            </tr>
        </table> 
    </body>
</html>"""

print(paginahtml)


"""
<h4> ligações: 
    link -> nome da cidade: distancia

dic[id] = nome
"""