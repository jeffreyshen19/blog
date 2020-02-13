import json
import csv
from nltk.tokenize import RegexpTokenizer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from wordfreq import word_frequency

'''
Extracts insights from bulk data
'''

f = open('../../data/lyricism/lyricalness.csv', 'w')
f.write("date,average_prop_unique_words,average_word_len,average_word_freq\n")

stop_words = set(stopwords.words('english'))
def get_unique_words(lyrics):
    tokenizer = RegexpTokenizer(r'\w+')
    words = tokenizer.tokenize(lyrics.replace("\n", " ").lower())
    words = [w for w in words if not w in stop_words]

    num_words = len(words)
    num_unique_words = len(set(words))
    total_word_length = 0;
    total_word_frequency = 0;

    for word in words:
        total_word_length += len(word)
        total_word_frequency += word_frequency(word, "en")

    return {
        "prop": num_unique_words / num_words,
        "average_word_len": total_word_length / num_words,
        "average_word_freq": total_word_frequency / num_words
    }

with open("./billboard.json") as r:
    data = json.load(r)

    for chart in data:
        total_prop = 0
        total_average_word_len = 0
        total_average_word_freq = 0
        total = 0

        for song in chart["songs"]:
            if song["lyrics"] != "":
                unique_words = get_unique_words(song["lyrics"])

                total_prop += unique_words["prop"]
                total_average_word_len += unique_words["average_word_len"]
                total_average_word_freq += unique_words["average_word_freq"]
                total += 1

        f.write(chart["date"] + "," + str(total_prop / total) + "," + str(total_average_word_len / total) + "," + str(1000 * total_average_word_freq / total) + "\n")

f.close()
