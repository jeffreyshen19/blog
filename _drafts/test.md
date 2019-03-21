---
layout: post
title:  "The Twitter Primary"
subtitle: "Exploring the Twitter following of several 2020 Democrat presidential candidates."
categories: Politics
source_code: ""
references: [{
    "url": "https://ballotpedia.org/Presidential_candidates,_2020",
    "title": "\"Presidential candidates, 2020\""
  },  
  {
    "url": "https://www.huffingtonpost.com/entry/twitter-2020-presidential-candidates_us_5c377f48e4b0c469d76c168f",
    "title": "\"Welcome To The 2020 Twitter Primary\""
  },
  {
    "url": "https://www.nytimes.com/interactive/2019/us/politics/2020-presidential-candidates.html",
    "title": "\"Who’s Running for President in 2020?\""
  }
]
header: default
javascript: twitter-primary.js
---

I recently read a [Huffington Post article](https://www.huffingtonpost.com/entry/twitter-2020-presidential-candidates_us_5c377f48e4b0c469d76c168f) exploring the Twitter followers of several front-running Democrat candidates for the 2020 Presidential Election. This got me thinking: Twitter is clearly hugely influential in online discourse, and certainly is reflective of a great deal of public sentiment surrounding the upcoming election. Are there other ways we can examine how Twitter users are engaging with each Democrat Presidential candidate?

For this post, I’ll be looking at several of the Democrat candidates who have officially announced their campaign as of March 21, 2019 (meaning no Joe Biden) and will be using the Twitter account most closely associated with each candidate’s campaign. All information was scraped using the Twitter API.

I'll first look at the number of followers each candidate has. While followers aren't necessarily an indication of support (many opponents of Donald Trump, for example, follow him on Twitter), they are a useful—albeit incomplete—metric of how much attention a candidate has drawn.

{% include graphs/bar-chart.html csv = "/data/twitter-primary/democrat-primary-candidates.csv" xlabel = "Presidential Candidate" ylabel = "Followers" title = "Twitter Followers, by Presidential Candidate" xcol = "candidate" ycols = "followers" linelabels = "Twitter Followers" linecolors = "#6c5ce7" height = 400 %}

Bernie Sanders clearly leads the pack in followers, with the other candidates trailing by at least four million followers. This overwhelming advantage makes sense: Sanders has a notable social media presence, and has been in the national spotlight for over four years, enabling him to garner more followers than some of the newcomers like Andrew Yang or Beto O'Rourke.

What about enthusiasm towards each candidate's announcement to run for president, though? I looked at the amount of likes and retweets each candidate received when they announced their presidential candidacy on Twitter to roughly approximate enthusiasm towards each candidate's bid.

{% include graphs/bar-chart.html csv = "/data/twitter-primary/democrat-primary-candidates.csv" xlabel = "Presidential Candidate" ylabel = "Likes" title = "Likes on each Candidate's Twitter Announcement" xcol = "candidate" ycols = "announcement_likes" linelabels = "Likes" linecolors = "#6c5ce7" height = 400 %}
{% include graphs/bar-chart.html csv = "/data/twitter-primary/democrat-primary-candidates.csv" xlabel = "Presidential Candidate" ylabel = "Retweets" title = "Retweets on each Candidate's Twitter Announcement" xcol = "candidate" ycols = "announcement_retweets" linelabels = "Retweets" linecolors = "#6c5ce7" height = 400 %}

Sanders again leads in overall retweets and likes, but surprisingly, Beto O'Rourke took the second place slot, reflecting a degree of excitement—and media attention—towards his candidacy.

Finally, I looked at average engagement (likes and retweets) to each post by a presidential candidate. I wanted to see how successful each candidate is at engaging with their audience on a regular basis on Twitter, so I've calculated the average amount of retweets and likes on each post per candidate. I've only counted posts which were posted after the presidential candidate announced their campaign on Twitter.

{% include graphs/bar-chart.html csv = "/data/twitter-primary/democrat-primary-candidates.csv" xlabel = "Presidential Candidate" ylabel = "Average Likes per Post" title = "Average Likes per Post (Since Announcement)" xcol = "candidate" ycols = "average_post_likes" linelabels = "Average Likes per Post" linecolors = "#6c5ce7" height = 400 %}
{% include graphs/bar-chart.html csv = "/data/twitter-primary/democrat-primary-candidates.csv" xlabel = "Presidential Candidate" ylabel = "Average Retweets per Post" title = "Average Retweets per Post (Since Announcement)" xcol = "candidate" ycols = "average_post_retweets" linelabels = "Average Retweets per Post" linecolors = "#6c5ce7" height = 400 %}


[Why is this?]

[look at maximum and minimum post likes and standard distribution (box charts for each candidate )]

RETWEETS NOT INCLUDED
