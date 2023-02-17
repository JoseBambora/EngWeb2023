import pandas as pd

restaurantes = pd.read_csv("../dataset/restaurantes.csv",encoding="utf8")
clubes = pd.read_csv("../dataset/clubes.csv",encoding="utf8")
automoveis = pd.read_csv("../dataset/automoveis.csv",encoding="utf8")

restaurantes = restaurantes.sort_values('nome')
clubes = clubes.sort_values('nome' )
automoveis = automoveis.sort_values('marca')


paginahtml = """
<!DOCTYPE html>
<html>
    <head>
        <title>Página de Itália</title>
        <meta charset="UTF-8"/>
    </head>
    <body>
        <h1>Página sobre Itália</h1>
        <table>
            <td width="30%" valign="top">
                <h2>Indice</h2>
                <ul>
                    <li><a href="#res">Resumo</a></li>
                    <li><a href="#rest">Restaurantes</a></li>
                    <li><a href="#fut">Futebol</a></li>
                    <li><a href="#aut">Automóveis</a></li>
                </ul>
            </td>
            <td width="70%">
            <a name="res"></a>
                <p>
                A Itália é um país localizado na região do sul da Europa, que faz fronteira com a França, Suíça, Áustria, Eslovênia, San Marino e Vaticano. Com uma rica história que remonta aos tempos antigos, a Itália é conhecida por sua cultura, culinária, arquitetura, moda e esportes.
                A capital da Itália é Roma, que é lar de muitas atrações turísticas populares, incluindo o Coliseu, o Vaticano e a Fontana di Trevi. Outras cidades importantes da Itália incluem Milão, Florença, Veneza e Nápoles.
                A Itália é um dos principais destinos turísticos do mundo, atraindo milhões de visitantes todos os anos para explorar suas cidades históricas, praias pitorescas, montanhas e lagos deslumbrantes. O país é famoso por sua culinária deliciosa, que inclui massas, pizzas, frutos do mar e queijos, além de uma grande variedade de vinhos.
                A Itália é conhecida por sua rica história artística e cultural, com obras de arte famosas de artistas como Michelangelo, Leonardo da Vinci e Botticelli. Além disso, a moda italiana é reconhecida em todo o mundo, com marcas de luxo como Gucci, Prada e Armani.
                A Itália também é conhecida por sua paixão pelo futebol, com algumas das equipes de futebol mais bem-sucedidas e populares do mundo, como a Juventus, AC Milan e Inter de Milão.
                No geral, a Itália é um país fascinante, repleto de história, cultura e beleza natural, que oferece uma experiência única e memorável para quem a visita.
                </p>
                <a name="rest"></a>
                <p>
                    <h2>Lista de restaurantes</h2>
                    <ul>"""

for _, res in restaurantes.iterrows():
    nome = res['nome']
    paginahtml += f"<li><a href=\"#{nome}\">{nome}</a></li>"

paginahtml +=    """
                    </ul>
                    <hr/>"""

# nome,localização,especialidade,avaliação,data_criação
for _, res in restaurantes.iterrows():
    nome = res['nome']
    localizacao = res['localização']
    especialidade = res['especialidade']
    ava = res['avaliação']
    data = res['data_criação']
    paginahtml += f""" 
                    <p>
                        <a name="{nome}"></a>
                        <h3>{nome}</h3>
                        <p>Localização: {localizacao}</p>
                        <p>Especialidade: {especialidade}</p>
                        <p>Avaliacao: {ava}</p>
                        <p>Data de criação: {data}</p>
                        <hr/>
                    </p>
    """

paginahtml += """
                </p>
                <a name="fut"></a>
                <p>
                    <h2>Lista de clubes</h2>
                    <ul>"""


for _, clu in clubes.iterrows():
    nome = clu['nome']
    paginahtml += f"<li><a href=\"#{nome}\">{nome}</a></li>"

paginahtml+= "</ul>\n<hr/>"

# nome,estádio,número_trofeus,data_criação
for _, clu in clubes.iterrows():
    nome = clu['nome']
    estadio = clu['estádio']
    num = clu['número_trofeus']
    data = clu['data_criação']
    paginahtml += f""" 
                    <p>
                        <a name="{nome}"></a>
                        <h3>{nome}</h3>
                        <p>Estádio: {estadio}</p>
                        <p>Número de trofeus: {num}</p>
                        <p>Data de criação: {data}</p>
                        <hr/>
                    </p>"""
paginahtml += """
                </p>
                <a name="aut"></a>
                <p>
                    <h2>Lista de automoveis</h2>
                    <ul>"""

for _, aut in automoveis.iterrows():
    nome = aut['marca']
    paginahtml += f"""<li><a href="#{nome}">{nome}</a></li>"""

paginahtml += "</ul>\n<hr/>"

# marca,localização,data_criação,categoria
for _, aut in automoveis.iterrows():
    nome = aut['marca']
    localizacao = aut['localização']
    data = aut['data_criação']
    cat = aut['categoria']
    paginahtml += f"""
                    <p>
                        <a name="{nome}"></a>
                        <h3>{nome}</h3>
                        <p>Localização: {localizacao}</p>
                        <p>Data de criação: {data}</p>
                        <p>Categoria: {cat}</p>
                        <hr/>
                    </p>"""
paginahtml += """
                </p>
            </td>
        </table>
    </body>
</html>"""
print(paginahtml)