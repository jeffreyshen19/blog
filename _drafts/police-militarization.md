---
layout: post
title:  "Tracking the Flow of Military Weapons into Police Departments"
subtitle: "Billions Worth of Equipment Made For War Have Been Transferred to Civilian Police Departments"
categories: Politics
source_code: "https://github.com/jeffreyshen19/jshen-personal-blog/tree/master/_code/police-militarization"
image: "police-militarization.jpg"
references: [{
    "title": "Department of Defense 1033 Program data",
    "url": "https://github.com/washingtonpost/data-1033-program"
}]
header: centered
caption: "Police use a mine-resistant armored vehicle—equipment designed for war—to monitor protests in Ferguson, MI (Source: NYT)"
featured: true
javascript: ["components/map.js", "components/line_chart_normalized.js"]
---

<div class = "map" data-csv = "/data/police-militarization/1033-by-state.csv">
</div>

<div class = "line-chart-normalized" data-csv = "/data/police-militarization/1033-by-time.csv" data-xlabel = "Date" data-ylabel = "Total Cost" data-title = "Add title" data-xcol = "date" data-ycols = "total-cost" data-linelabels = "Add line label" data-linecolors = "#3a539b" data-xcolparse = "%m/%Y" data-tooltipformat = "%B %Y" margin = "{top: 0, right: 20, bottom: 20, left: 80}" data-yaxisformat = "true" data-useoffset = "false"></div>
