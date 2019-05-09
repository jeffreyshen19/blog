import os
from dotenv import load_dotenv
import requests
import re
load_dotenv()

'''
Scrapes 88Rising's Youtube Channel for all music content
Music content is identified if it fits the form [some artists] - [the title], and manually cleaned for junk content
'''

API_KEY = os.getenv("YOUTUBE_API_KEY")
UPLOAD_PLAYLIST_ID = os.getenv("UPLOAD_PLAYLIST_ID")

videos = []

r = requests.get("https://www.googleapis.com/youtube/v3/playlistItems?playlistId=" + UPLOAD_PLAYLIST_ID + "&key=" + API_KEY + "&part=snippet&maxResults=50").json()
videos = videos + r["items"]

while r and "nextPageToken" in r and r["nextPageToken"]:
    r = requests.get("https://www.googleapis.com/youtube/v3/playlistItems?playlistId=" + UPLOAD_PLAYLIST_ID + "&key=" + API_KEY + "&part=snippet&maxResults=50&pageToken=" + r["nextPageToken"]).json()
    videos = videos + r["items"]

f = open("video_titles.txt", "w+")
p = re.compile("^[^-]+ - .+$")
for video in videos:
    if p.match(video["snippet"]["title"]): f.write(video["snippet"]["title"] + "\n")

f.close()
