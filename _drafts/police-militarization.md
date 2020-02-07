---
layout: post
title:  "Tracking Military Weapons in Police Departments"
subtitle: "Billions in War Equipment Have Been Transferred to Civilian Agencies"
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

<div class = "line-chart-normalized" data-csv = "/data/police-militarization/1033-by-time.csv" data-xlabel = "Date" data-xcol = "date" data-linecolors = "#3a539b" data-xcolparse = "%m/%Y" data-tooltipformat = "%B %Y" data-margin = '{"top":0,"right":20,"bottom":20,"left":70}' data-useoffset = "false" data-ycols = '[{"ycol":"total-quantity","label":"Total Quantity","title": "Quantity of Items Acquired, Over Time"},{"ycol":"total-cost","label":"Total Cost","title": "Cost of Items Acquired, Over Time"}]' data-id = "2"></div>

<div class = "line-chart-normalized" data-csv = "/data/police-militarization/us-population-and-crime.csv" data-xlabel = "Date" data-xcol = "year" data-linecolors = "#3a539b" data-xcolparse = "%Y" data-tooltipformat = "%Y" data-margin = '{"top":0,"right":20,"bottom":20,"left":70}' data-useoffset = "false" data-ycols = '[{"ycol":"population","label":"Population","title": "U.S. Population Over Time"},{"ycol":"violent-crime-rate","label":"Violent Crimes Per 100k People","title": "Violent Crime Rate Over Time"}]'  data-id = "3"></div>
