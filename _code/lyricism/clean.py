import os
from os import listdir
from os.path import isfile, join
import json
import lyricsgenius
import re

'''
Identifies missing data
'''
genius = lyricsgenius.Genius(os.environ["GENIUS_ACCESS_TOKEN"])
genius.remove_section_headers = True
genius.skip_non_songs = True
genius.excluded_terms = ["(Instrumental)"]

existingSongs = []

def alreadySearched(title, artist):
    for song in existingSongs:
        if song['title'] == title and song['artist'] == artist:
            return song
    return False

counter = 0

data = []
with open("./billboard-cleaned.json") as f:
    data = json.load(f)

    for chart in data:
        for song in chart["songs"]:
            if song["lyrics"] == "":
                title = re.sub(r"\([^\)]+\)", "", song["title"]).strip()
                title = title.replace("Dear Mama/Old School", "Dear Mama")
                title = title.replace("Untitled 07 l Levitate", "Untitled 07")
                title = title.replace("F*ckwithmeyouknowigotit", "Fuckwithmeyouknowigotit")
                title = title.replace("The Phuncky Feel One/How I Could Just Kill A Man", "How I Could Just Kill A Man")
                title = title.replace("Brainstorming/G-String", "Brainstorming")
                title = title.replace("Woo-Hah!! Got You All In Check/Everything Remains Raw", "Woo-Hah!! Got You All In Check")

                artist = re.sub(r"(Featuring|With|W\/|Feat.|&|Presents|From|featuring|,|Co-Starring|AKA|\+|Introducing|Tell'em|Feautring).*$", "", song["artist"]).strip() #Clean up the artist name so there is a higher chance of matching

                lyrics = alreadySearched(title, artist)

                if lyrics:
                    song["lyrics"] = lyrics['lyrics']
                else:
                    lyrics = genius.search_song(title, artist)
                    if lyrics:
                        lyrics = lyrics.lyrics
                        print("FOUND LYRICS")
                    else:
                        lyrics = ""
                        counter += 1

                    existingSongs.append({
                        "artist": artist,
                        "title": title,
                        "lyrics": lyrics,
                    })

                    song["lyrics"] = lyrics

print(counter)

with open('billboard-cleaned.json', 'w') as outfile:
    json.dump(data, outfile)
