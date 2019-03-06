---
layout: post
title:  "\"Mumble Rap,\" Visualized"
subtitle: "Has hip-hop become less lyrical?"
categories: Culture
source_code: "https://github.com/jeffreyshen19/jshen-personal-blog/tree/master/data/mumble_rap"
image: "test.jpg"
references: []
color: "#fff"
---

{% include graphs/line-chart.html csv = "/data/mumble_rap/lyricalness.csv" xlabel = "Date" ylabel = "Avg. % of Unique Words" title = "Lyricism over Time" xcol = "date" ycols = "average_prop_unique_words,average_unique_words" linelabels = "average_prop_unique_words,average_unique_words" linecolors = "#ccc,#bbb" %}
