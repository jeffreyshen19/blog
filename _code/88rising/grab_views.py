import os
from dotenv import load_dotenv
import requests
import re
load_dotenv()

'''
Gets and sorts all videos by views
'''

API_KEY = os.getenv("YOUTUBE_API_KEY")
UPLOAD_PLAYLIST_ID = os.getenv("UPLOAD_PLAYLIST_ID")

f = open("video_titles.txt", "r")
titles = f.read().split("\n")
videos = []

r = requests.get("https://www.googleapis.com/youtube/v3/playlistItems?playlistId=" + UPLOAD_PLAYLIST_ID + "&key=" + API_KEY + "&part=snippet&maxResults=50").json()
videos = videos + r["items"]

while r and "nextPageToken" in r and r["nextPageToken"]:
    r = requests.get("https://www.googleapis.com/youtube/v3/playlistItems?playlistId=" + UPLOAD_PLAYLIST_ID + "&key=" + API_KEY + "&part=snippet&maxResults=50&pageToken=" + r["nextPageToken"]).json()
    videos = videos + r["items"]

videos = list(filter(lambda x: x["snippet"]["title"] in titles, videos))
videoIdString = list(map(lambda x: x["snippet"]["resourceId"]["videoId"], videos))

# Split videoIds into chunks of 50 to optimize API calls
def divide_chunks(l, n):
    for i in range(0, len(l), n):
        yield l[i:i + n]

chunks = list(divide_chunks(videoIdString, 50))
results = []
for chunk in chunks:
    r = requests.get("https://www.googleapis.com/youtube/v3/videos?id=" + (",".join(chunk)) + "&part=statistics,snippet&key=" + API_KEY).json()
    results += r["items"]

# Sort by views
results = sorted(results, key=lambda k: int(k["statistics"]["viewCount"]), reverse=True)

f = open("video_statistics.csv", "w+")
f.write("id,title,displayTitle,publishedAt,views,likes,dislikes\n")

def cleanTitle(title):
    title = re.sub(r"\((official|out|full|music video|audio|soon|icy beat|lyric)[^)]*\)", "", title, flags=re.IGNORECASE)
    title = re.sub(r"(\/\/|\||\[\])[^\$]+$", "", title)
    return title.strip()

for result in results:
    f.write(result["id"] + ",\"" + result["snippet"]["title"] + "\",\"" + cleanTitle(result["snippet"]["title"]) +  "\"," + result["snippet"]["publishedAt"] + "," + result["statistics"]["viewCount"] + "," + result["statistics"]["likeCount"] + "," + result["statistics"]["dislikeCount"] + "\n")

f.close()
