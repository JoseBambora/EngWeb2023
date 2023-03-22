import json
import requests

file = open('dataset-extra1.json')
data = json.load(file)
file.close()

people = data['pessoas']

atributos = set()

for entry in people:
    if 'CC' in entry.keys():
        entry['_id'] = entry['CC']
    else:
        entry['_id'] = entry['BI']
    if 'descrição' in entry.keys():
        entry['descricao'] = entry['descrição']
        del entry['descrição']
    del entry['id']

for entry in people:
    res = requests.post('http://localhost:7777/person',json = entry)
    k = entry['_id']
    print(f'{k} adicionado')

