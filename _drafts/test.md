---
layout: post
title:  "The 2020 Democratic Primary on Twitter"
subtitle: "Exploring the Twitter following of each Democrat presidential candidate."
categories: Politics
source_code: ""
references: []
header: default
javascript: twitter-primary.js
---

{% include graphs/bar-chart.html csv = "/data/twitter-primary/democrat-primary-candidates.csv" xlabel = "Presidential Candidate" ylabel = "Followers" title = "Twitter Followers, by Presidential Candidate" xcol = "candidate" ycols = "followers" linelabels = "Twitter Followers" linecolors = "#6c5ce7" height = 400 %}
