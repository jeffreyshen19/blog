import json
import csv
from nltk.tokenize import RegexpTokenizer

'''
Extracts insights from bulk data
'''

f = open('../../data/lyricism/lyricalness.csv', 'w')
f.write("date,average_unique_words,average_prop_unique_words,average_total_words\n")

def get_unique_words(lyrics):
    tokenizer = RegexpTokenizer(r'\w+')
    words = tokenizer.tokenize(lyrics.replace("\n", " ").lower())

    num_words = len(words)
    num_unique_words = len(set(words))

    return {
        "unique": num_unique_words,
        "prop": num_unique_words / num_words,
        "total": num_words
    }

with open("./billboard.json") as r:
    data = json.load(r)

    for chart in data:
        total_unique_words = 0
        total_words = 0
        total_prop = 0
        total = 0

        for song in chart["songs"]:
            if song["lyrics"] != "":
                unique_words = get_unique_words(song["lyrics"])

                total_unique_words += unique_words["unique"]
                total_words += unique_words["total"]
                total_prop += unique_words["prop"]
                total += 1

        f.write(chart["date"] + "," + str(total_unique_words / total) + "," + str(total_prop / total) + "," + str(total_words / total) + "\n")

f.close()
