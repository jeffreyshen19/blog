---
layout: post
title:  "The 2020 Democratic Primary on Twitter"
subtitle: "Exploring the Twitter following of each Democrat presidential candidate."
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

I recently read a [Huffington Post article](https://www.huffingtonpost.com/entry/twitter-2020-presidential-candidates_us_5c377f48e4b0c469d76c168f) exploring the Twitter followers of several front-running Democrat candidates for the 2020 Presidential Election. This got me thinking: Twitter is clearly hugely influential in online discourse, and certainly is reflective of a great deal of public sentiment surrounding the upcoming election. So could we take the findings of the Huffington Post article further, and explore how each candidate is being discussed on Twitter?

For this study, I’ll be looking at all the Democrat candidates who have officially announced their campaign as of March 10, 2019 and will be using the Twitter account most closely associated with each candidate’s campaign. You can find additional details on methodology in the [section below](). Nevertheless, let’s just get started.

{% include graphs/bar-chart.html csv = "/data/twitter-primary/democrat-primary-candidates.csv" xlabel = "Presidential Candidate" ylabel = "Followers" title = "Twitter Followers, by Presidential Candidate" xcol = "candidate" ycols = "followers" linelabels = "Twitter Followers" linecolors = "#6c5ce7" height = 400 %}

What about engagement to the candidate’s announcement?

{% include graphs/bar-chart.html csv = "/data/twitter-primary/democrat-primary-candidates.csv" xlabel = "Presidential Candidate" ylabel = "Likes" title = "Likes on each Candidate's Twitter Announcement" xcol = "candidate" ycols = "announcement_likes" linelabels = "Likes" linecolors = "#6c5ce7" height = 400 %}
{% include graphs/bar-chart.html csv = "/data/twitter-primary/democrat-primary-candidates.csv" xlabel = "Presidential Candidate" ylabel = "Retweets" title = "Retweets on each Candidate's Twitter Announcement" xcol = "candidate" ycols = "announcement_retweets" linelabels = "Retweets" linecolors = "#6c5ce7" height = 400 %}

What about engagement to candidate’s posts and right now?

{% include graphs/bar-chart.html csv = "/data/twitter-primary/democrat-primary-candidates.csv" xlabel = "Presidential Candidate" ylabel = "Average Likes per Post" title = "Average Likes per Post, by Presidential Candidate" xcol = "candidate" ycols = "average_post_likes" linelabels = "Average Likes per Post" linecolors = "#6c5ce7" height = 400 %}
{% include graphs/bar-chart.html csv = "/data/twitter-primary/democrat-primary-candidates.csv" xlabel = "Presidential Candidate" ylabel = "Average Retweets per Post" title = "Average Retweets per Post, by Presidential Candidate" xcol = "candidate" ycols = "average_post_retweets" linelabels = "Average Retweets per Post" linecolors = "#6c5ce7" height = 400 %}

## Methodology
Twitter account used is their personal account
Announcement date is the date announced on twitter
Hashtags are just “candidate first name or last name + 2020” intelligently computed.
I ignored some candidates ,(john delaney, marianne williamson, etc.) , including only those I thought were interesting/attracted a large media presence.  Since this explores twitter, I only included presidental candidates who formally announced their candidacy (so no joe biden).
Data last updated …
all figures sourced from when the user announced their campaign
include mentions for andrewyangvfa
i’m including retweets in mentions
mentions includes replies
