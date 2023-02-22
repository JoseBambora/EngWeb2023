import json
from functools import reduce

f = open("dataset/mapa.json")
mapa = json.load(f)
cidades = mapa["cidades"]
cidades.sort(key=lambda city: city['nome'])
distritos = {}
for c in cidades:
    dis = c['distrito']
    if not distritos.__contains__(dis):
        distritos[dis] = []
    distritos[dis].append((c['nome'],c['id']))
distritos = list(map(lambda k: (k,distritos[k]),distritos.keys()))
distritos.sort(key=lambda v: v[0])

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

for con in lig.values():
    con.sort(key=lambda elem:idnomes[elem[0]])

defaultpag = """<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="UTF-8"/>
    </head>
    <body>"""

def geraIndexHTML():
    pag = defaultpag
    for dis in distritos:
        pag += """
        <p>"""
        pag += f"""
            {dis[0]}
            <ul>"""
        for city in dis[1]:
            pag += f"""
                <li><a href='/{city[1]}'>{city[0]}</a></li>"""
        pag += """
            </ul>"""
        pag += """
        </p>"""
    pag += """
    </body>
</html>"""
    # print(distritosres)
    filename = "pages/index.html"
    with open(filename,"w") as file:
        file.write(pag)


def geraPaginaCity(c):
    pag = defaultpag
    pag += f"""
        <a name="{c['id']}"></a>
        <h3>{c['nome']}</h3>
        <p><b>Distrito:</b> {c["distrito"]}</p>
        <p><b>População:</b> {c["população"]}</p>
        <p><b>Descrição:</b> {c["descrição"]}</p>
        <p><h4>Ligações:</h4>
            <ul>"""
    con = lig[c['id']]
    for connection in con:
        pag += f"""
                <li><a href="/{connection[0]}">{idnomes[connection[0]]}</a>: {connection[1]}</li>"""
    pag += """
            </ul>
            </p>
        <adress>[<a href="/">Voltar ao Indice</a>]</a>
    </body>
</html>"""
    filename = f"pages/{c['id']}.html"
    with open(filename,"w") as file:
        file.write(pag)

geraIndexHTML()
for c in cidades:
    geraPaginaCity(c)