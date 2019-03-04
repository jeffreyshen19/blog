from os import listdir
from os.path import isfile, join
import json

'''
Combines all json files into one file
'''

files = [f for f in listdir("./billboards/") if isfile(join("./billboards/", f))] # All files in folder

output = []
for file in files:
    with open('./billboards/' + file) as f:
        data = json.load(f)

        # Concatenate
        output.append({
            "date": file.replace(".json", ""),
            "songs": data
        })

with open('billboard.json', 'w') as outfile:
    json.dump(output, outfile)
