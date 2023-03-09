import json
users = []
tasks = []
res = {
    "users":users,
    "tasks":tasks
}

tas = ['Study EW',
     'Study PL',
     'Watch Avengers',
     'Play football',
     'Play CS',
     'Cook',
     'Take Bath',
     'Sleep',
     'Read Book',
     'Eat',
     'Drink water',
     'Gym']

for i in range(0,100):
    u = {
        'id': f'u{i}',
        'nome': f'name{i}'
    }
    users.append(u)

l = len(tas)

for i in range(0,10000):
    t = {
        'id': f't{i}',
        'who': f'u{i%100}',
        'what': tas[i%l],
    }
    if i % 2 == 0:
        t['done'] = 0
    tasks.append(t)

file = open('data-taskmanager.json',mode="w")
json.dump(res,file,indent=4)
file.close()