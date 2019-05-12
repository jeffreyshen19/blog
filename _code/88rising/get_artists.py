import csv
import re
import json

'''
Scrapes the titles to identify which artists played and are connected to who
'''

def getArtists(title):
    artists = []
    feats = re.search('(feat\.?|ft\.?) ([^\(\)\-\n]+)', title)
    prods = re.search('[Pp]rod(\.|uced)?( [Bb]y\.?)? ([^\)\]\-\n]+)', title)
    main = re.search('(^[^-]+)', title)

    def splitArtistString(str):
        return re.split('(?:(?:ft|feat)\.| [xX\+&] |, &|,|and)' ,str)

    def standardizeArtist(str):
        s = str.lower()
        if s == "joji": return "Joji"
        elif s == "rich brian": return "Rich Brian"
        elif s == "higher brothers" or s == "higher brothers over the wall": return "Higher Brothers"
        elif s == "ronnyjlistenup": return "RONNYJ"
        elif s == "yaeji": return "Yaeji"
        elif s == "j mag": return "J. MAG"
        elif s == "lexie": return "Lexie Liu"
        else: return str

    if feats: artists += splitArtistString(feats.group(2))
    if prods: artists += splitArtistString(prods.group(3))
    if main: artists += splitArtistString(main.group(0))

    artists = list(map(lambda x: standardizeArtist(x.strip()), artists))

    return list(set(artists))

def getGroup(artist):
    if artist == "88RISING": return 1
    elif artist in ["Rich Brian", "Joji", "Keith Ape", "AUGUST 08", "Higher Brothers", "NIKI", "Lexie Liu", "MaSiWei"]: return 2 # current artists
    elif artist in ["ZHU.", "Yaeji", "Okasian", "Bryan Cha$e", "Phum Viphurit", "HYUKOH (\ud601\uc624)", "KOHH", "Verbal", "Bohan Phoenix", "Jay Park", "HARIKIRI", "Brian Puspos", "Dumbfoundead", "Towkio", "Simon D", "G2", "josh pan", "Suboi", "Rina Sawayama", "Sen Morimoto", "Bengfang", "Dbo", "Tatsuro Yamashita", "Shigeo Sekito", "Jess Connelly", "YURUFUWA GANG", "Japanese Breakfast", "Giraffage", "Eric Nam", "Yeseo", "YENTOWN", "Horim", "CIFIKA", "Gentle Bones", "DMEANOR", "Ikkubaru", "Rainbow Chan", "KID FRESINO", "jjj", "Yllis", "Tanukichan", "Starro", "Guzz"]: return 3 # former artists and asian affiliates
    else: return 4

with open('video_statistics.csv') as csvfile:
    rows = csv.DictReader(csvfile)

    artists = []
    views = []
    count = []
    adjacency = {}

    for row in rows:
        rowArtists = getArtists(row["displayTitle"])
        for i in range(len(rowArtists)):
            if rowArtists[i] in artists:
                views[artists.index(rowArtists[i])] += int(row["views"])
                count[artists.index(rowArtists[i])] += 1
            else:
                artists.append(rowArtists[i])
                views.append(int(row["views"]))
                count.append(1)

            if rowArtists[i] not in adjacency:
                adjacency[rowArtists[i]] = {}

            columnArtists = [x for j,x in enumerate(rowArtists) if j != i]

            for artist in columnArtists:
                if artist not in adjacency[rowArtists[i]]: adjacency[rowArtists[i]][artist] = 1
                else: adjacency[rowArtists[i]][artist] += 1

    adjacency_formatted = {
        "nodes": [],
        "links": []
    }

    for key in adjacency:
        adjacency_formatted["nodes"].append({
            "id": key,
            "group": getGroup(key),
            "count": count[artists.index(key)]
        })

        for key2,value in adjacency[key].items():
            if not any(d.get('source', None) == key2 and d.get('target', None) == key for d in adjacency_formatted["links"]): adjacency_formatted["links"].append({"source": key, "target": key2, "value": value})

    with open('adjacency.json', 'w') as outfile:
        json.dump(adjacency_formatted, outfile)

    # Create bar chart of each artist views
    f = open('artist_statistics.csv', "w+")
    av = sorted(list(zip(artists, views, count)), key=lambda x: x[1], reverse=True)
    f.write("artist,views,num_videos,avg_views\n")
    for data in av:
        f.write(data[0] + "," + str(data[1]) + "," + str(data[2]) + "," + str(data[1] / data[2]) + "\n")

    f.close()
