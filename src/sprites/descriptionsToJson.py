import json

arr = []

with open('./descriptions.txt', 'r') as fs:
    line = fs.readline()
    while line:
        line = line.split('|')
        if line == [''] :
            line = fs.readline()
            continue
        filename, name, description = line
        description = description.rstrip('\n')
        arr.append({"id":filename, "name":name, "description":description})
        line = fs.readline()
    fs.close()

with open('./descriptions.json', 'w') as fs:
    fs.write(json.dumps({"descriptions": arr}, indent=4))
        