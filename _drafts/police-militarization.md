---
layout: post
title:  "Tracking the Flow of Military Weapons into Police Departments"
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
javascript: ["components/map.js", "components/line_chart_normalized.js", "components/pie_chart_normalized.js"]
---

Since 1990, the 1033 Program has authorized the transfer of military equipment such as tanks, grenade launchers, and assault rifles at nearly no cost to civilian police departments across the U.S. While some [supporters claim](https://www.usatoday.com/story/news/politics/2017/08/27/trump-expected-lift-ban-military-gear-local-police-forces/606065001/) the program offers life-saving equipment that law enforcement agencies otherwise could not afford, the program has also accelerated police militarization across the country.

For instance, following protests in Ferguson, MI in 2014, local police responded by deploying armored vehicles, sniper rifles, and body armor—some of which was acquired through the 1033 Program—against mostly peaceful protestors. The militarized response to protests in Ferguson prompted President Obama to limit the extent of the program, though these restrictions were later reversed by the Trump administration.

While it is disturbing enough that equipment made for war is being used by civilian police departments to crush protests, widespread evidence of [police brutality and racial bias](https://mappingpoliceviolence.org/) in policing raise concerns about the deadly consequences of increased police militarization. According to an [article](https://www.washingtonpost.com/news/monkey-cage/wp/2017/06/30/does-military-equipment-lead-police-officers-to-be-more-violent-we-did-the-research/) in *The Washington Post*, increased police militarization has led officers to be more violent.

Using data on the 1033 Program acquired by *The Washington Post*, it is clear that the total quantity and worth of equipment transferred to local departments has skyrocketed in recent years, despite the population in the U.S. increasing only slightly and violent crime actually going down nationwide.

<div class = "line-chart-normalized" data-csv = "/data/police-militarization/1033-by-time.csv" data-xlabel = "Date" data-xcol = "date" data-linecolors = "#3a539b" data-xcolparse = "%m/%Y" data-tooltipformat = "%B %Y" data-margin = '{"top":0,"right":20,"bottom":20,"left":70}' data-useoffset = "false" data-ycols = '[{"ycol":"total-quantity","label":"Total Quantity","title": "Quantity of Items Acquired, Over Time"},{"ycol":"total-cost","label":"Total Cost","title": "Cost of Items Acquired, Over Time"}]' data-id = "2"></div>

<div class = "line-chart-normalized" data-csv = "/data/police-militarization/us-population-and-crime.csv" data-xlabel = "Date" data-xcol = "year" data-linecolors = "#3a539b" data-xcolparse = "%Y" data-tooltipformat = "%Y" data-margin = '{"top":0,"right":20,"bottom":20,"left":70}' data-useoffset = "false" data-ycols = '[{"ycol":"violent-crime-rate","label":"Violent Crimes Per 100k People","title": "Violent Crime Rate Over Time"},{"ycol":"population","label":"Population","title": "U.S. Population Over Time"}]'  data-id = "3"></div>




<div class = "map" data-csv = "/data/police-militarization/1033-by-state.csv">
</div>


(ignoring "other")


<div class = "pie-chart-normalized" data-csv = "/data/police-militarization/1033-by-category.csv" data-xcol = "category" data-colorrange="#e4f1fe,#1d285b" data-ycols = '[{"ycol":"Quantity","label":"Total Quantity"},{"ycol":"Cost","label":"Total Cost"}]' data-id = "4"></div>

https://www.aclu.org/blog/racial-justice/race-and-criminal-justice/we-remember-militarized-response-ferguson-uprising
