import json

infile = open('dataset-extra1.json')
data = json.load(infile)
pessoas = data['pessoas']
i = 0
for p in pessoas:
    p['id'] = f'p{i}'
    i+=1
with open('dataset-extra1-res.json', 'w') as outfile:
   json.dump(data,outfile, indent=2)