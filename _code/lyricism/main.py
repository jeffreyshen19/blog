import lyricsgenius
import billboard
import os
import re
import json

'''
Scrapes Billboard Rap Charts & Genius to get lyrics of all hot rap songs from 1989 - March 3, 2019
Outputs results as individual .json files for each chart week
'''

genius = lyricsgenius.Genius(os.environ["GENIUS_ACCESS_TOKEN"])
genius.remove_section_headers = True

chart = billboard.ChartData('rap-song', date="1992-02-29")
existingSongs = []

def alreadySearched(title, artist):
    for song in existingSongs:
        if song['title'] == title and song['artist'] == artist:
            return song
    return False

while chart.previousDate:
    print("** Scraping chart for " + chart.date + " **")
    songs = []

    for song in chart:
        title = re.sub(r"\([^\)]+\)", "", song.title).strip()
        lyrics = alreadySearched(title, song.artist)
        if lyrics:
            lyrics = lyrics['lyrics']
        else:
            lyrics = genius.search_song(title, song.artist)
            if lyrics:
                lyrics = lyrics.lyrics
            else:
                lyrics = ""
            existingSongs.append({
                "artist": song.artist,
                "title": title,
                "lyrics": lyrics,
                "rank": song.rank
            })

        songs.append({
            "title": title,
            "artist": song.artist,
            "lyrics": lyrics
        })

    with open('billboards/' + chart.date + '.json', 'w') as outfile:
        json.dump(songs, outfile)

    chart = billboard.ChartData('rap-song', chart.previousDate)
