import pandas as pd
import json

data = pd.read_csv('alunos.csv',sep = ';', encoding='utf-8')

lista = []

for _,d in data.iterrows():
    dicionario = {}
    dicionario['id'] = d[0]
    dicionario['nome'] = d[1]
    dicionario['gitlink'] = d[2]
    lista.append(dicionario)

res = {'alunos': lista}

file = open('alunos.json',mode='w')
json.dump(res,file,indent=4)
file.close()

