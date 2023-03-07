import json

infile1 = open('dataset.json')
infile2 = open('dataset-extra1.json')
infile3 = open('dataset-extra2.json')
infile4 = open('dataset-extra3.json')
data1 = json.load(infile1)
data2 = json.load(infile2)
data3 = json.load(infile3)
data4 = json.load(infile4)
infile1.close()
infile2.close()
infile3.close()
infile4.close()
pessoas1 = data1['pessoas']
pessoas2 = data2['pessoas']
pessoas3 = data3['pessoas']
pessoas4 = data4['pessoas']
i = 0
for p in pessoas1:
    p['id'] = f'p{i}'
    i+=1
for p in pessoas2:
    p['id'] = f'p{i}'
    i+=1
for p in pessoas3:
    p['id'] = f'p{i}'
    i+=1
for p in pessoas4:
    p['id'] = f'p{i}'
    i+=1
pessoas1 = pessoas1 + pessoas2 + pessoas3 + pessoas4
with open('dataset-res.json', 'w') as outfile:
   json.dump(data1,outfile, indent=2)