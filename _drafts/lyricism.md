---
layout: post
title:  "Has Hip-Hop Become Less Lyrical?"
subtitle: "Analyzing the complexity of Billboard's Hot Rap Songs, from 1989 - 2019"
categories: Culture
source_code: "https://github.com/jeffreyshen19/jshen-personal-blog/tree/master/data/lyricism"
image: "blueface.jpg"
references: []
header: centered
caption: "L.A. rapper Blueface is just one of many newer artists criticized as lacking talent or lyricism."
---

Lyricism in hip-hop seems to be on the decline, with many of today's rappers replacing the intricate rhymes and storytelling of the nineties with catchy (but nevertheless lyrically deficient) bars. Yet, criticism of “modern music” has always been tainted with some degree of nostalgia, and it’s easy to cherry-pick examples of hip-hop’s supposed decline. So, have popular rap songs actually gotten less lyrical over time? I scraped the lyrics of Billboard’s Hot Rap Songs to find out.  

Billboard provides twenty-five of the most popular rap songs, updated weekly, through their [Hot Rap Songs](https://www.billboard.com/charts/rap-song) chart. I scraped the lyrics (using [Genius](https://genius.com)) for every song on these charts, from 1989 (when the chart was created) up to the present, giving me a dataset of popular rap song lyrics over time.

The first thing I was interested in was if songs have gotten less lyrically dense over time. In other words, has the percentage of unique words in popular rap songs decreased over time? If today's rappers are less lyrical than previous generations, one would expect that they also use a smaller vocabulary. So to analyze this, I calculated the average proportion of unique words per song for each chart week of the Billboard Hot Rap Songs. In this way, I had one number to describe how "lyrical" any given week's most popular 25 songs were. Then, I plotted against time:

{% include graphs/line-chart.html csv = "/data/lyricism/lyricalness.csv" xlabel = "Date" ylabel = "Avg. % of Unique Words" title = "Lyricism over Time" xcol = "date" ycols = "average_prop_unique_words" linelabels = "Average % of Unique Words" linecolors = "#446cb3" %}

As can be seen, the average proportion of unique words used per song does not actually vary significantly, with most values staying between 0.3 and 0.45. In other words, today's rap songs are not any less "lyrical" (use less unique words per song) than previous generations.

What about the types of words being used, though? Are rappers today using less complex words or discussing more superficial topics?

* [average word length]
* [which generation actually was the most lyrical?]
* add indexes for various milestones on the graph

# Methods

* All lyrics scraped from Genius.
* "Words" were identified using NLTK's tokenizer. This splits along punctuation, which mostly works, but also identifies contractions as two words (i.e. "isn't" → "isn" and "t").
