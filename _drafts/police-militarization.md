---
layout: post
title:  "Tracking the Militarization of Police Departments"
subtitle: "Billions Worth Of Military Equipment Has Been Transferred to Local Law Enforcement "
categories: Politics
source_code: "https://github.com/jeffreyshen19/jshen-personal-blog/tree/master/_code/police-militarization"
image: "police-militarization.jpg"
references: [{
  "title": "As We Remember the Militarized Response to the Ferguson Uprising, Trump Says Civilian Police Are Making ‘Good Use’ of Military Weapons",
  "url": "https://www.aclu.org/blog/racial-justice/race-and-criminal-justice/we-remember-militarized-response-ferguson-uprising",
}, {
  "title": "Census Population Data",
  "url": "https://www.census.gov/data/datasets/time-series/demo/popest/2010s-state-total.html#par_textimage_500989927"
}, {
  "title": "Department of Defense 1033 Program Data",
  "url": "https://github.com/washingtonpost/data-1033-program"
}, {
  "title": "FBI Violent Crime Data",
  "url": "https://ucr.fbi.gov/crime-in-the-u.s/2015/crime-in-the-u.s.-2015/tables/table-1"
}]
header: centered
caption: "Police use a mine-resistant armored vehicle—equipment designed for war—to monitor protests in Ferguson, MI (Source: NYT)"
featured: true
javascript: ["components/map.js", "components/line_chart_normalized.js", "components/pie_chart_normalized.js"]
---

Since 1990, the 1033 Program has authorized the transfer of military equipment such as tanks, grenade launchers, and assault rifles at nearly no cost to civilian police departments across the U.S. While some [supporters claim](https://www.usatoday.com/story/news/politics/2017/08/27/trump-expected-lift-ban-military-gear-local-police-forces/606065001/) the program offers life-saving equipment that law enforcement agencies otherwise could not afford, the program has also accelerated police militarization across the country.

For instance, following protests in Ferguson, MI in 2014, local police responded by deploying armored vehicles, sniper rifles, and body armor—some of which was acquired through the 1033 Program—against mostly peaceful protestors. The militarized response to protests in Ferguson prompted President Obama to limit the extent of the program, though these restrictions were later reversed by the Trump administration.

While it is disturbing enough that equipment made for war is being used by civilian police departments to crush protests, widespread evidence of [police brutality and racial bias](https://mappingpoliceviolence.org/) in policing raise concerns about the deadly consequences of increased police militarization. According to an [article](https://www.washingtonpost.com/news/monkey-cage/wp/2017/06/30/does-military-equipment-lead-police-officers-to-be-more-violent-we-did-the-research/) in *The Washington Post*, increased police militarization has led officers to be more violent.

As can be seen below, the 1033 Program has enabled the transfer of equipment that most people would likely consider unnecessary to most local police agencies: armored vehicles, assault rifles, grenade launchers, and even attack planes.

<div class = "pie-chart-normalized" data-csv = "/data/police-militarization/1033-by-category.csv" data-xcol = "category" data-colorrange="#e4f1fe,#1d285b" data-ycols = '[{"ycol":"Quantity","label":"Total Quantity"},{"ycol":"Cost","label":"Total Cost"}]' data-id = "4"></div>  
<br>

This data was sourced by *The Washington Post*, and categories were computationally calculated by searching for relevant keywords such as "aircraft" and "rifle,5.56 millimeter". Items which couldn't be categorized, mostly accessories, clothing, and bags, were excluded from this visualization, though they did make up the majority of reports in *The Post's* data.

Additionally, most items transferred by the 1033 Program were sent to larger states such as California, Texas, and Florida. However, after normalizing by population, the distribution of items is somewhat more even, though Texas still dominates in terms of quantity of items. This result indicates that military weapons are being sent to law enforcement agencies across the country at roughly equal rates.

Similarly, after normalizing the data by the FBI's violent crime rate (in 2015), the graph still remains uneven. If police militarization was actually a function of violent crime, as many of its supporters claim it to be, we would expect a more even distribution of 1033 Program data because each state would be acquiring equipment roughly proportional to its crime rate. However, this is clearly not the case.

<div class = "map" data-csv = "/data/police-militarization/1033-by-state.csv">
</div>

This is further reinforced by the fact that [line chart is not related to violent crime]

<div class = "line-chart-normalized" data-csv = "/data/police-militarization/1033-by-time.csv" data-xlabel = "Date" data-xcol = "date" data-linecolors = "#3a539b" data-xcolparse = "%m/%Y" data-tooltipformat = "%B %Y" data-margin = '{"top":0,"right":20,"bottom":20,"left":70}' data-useoffset = "false" data-ycols = '[{"ycol":"total-quantity","label":"Total Quantity","title": "Quantity of Items Acquired, Over Time"},{"ycol":"total-cost","label":"Total Cost","title": "Cost of Items Acquired, Over Time"}]' data-id = "2"></div>

<div class = "line-chart-normalized" data-csv = "/data/police-militarization/us-population-and-crime.csv" data-xlabel = "Date" data-xcol = "year" data-linecolors = "#3a539b" data-xcolparse = "%Y" data-tooltipformat = "%Y" data-margin = '{"top":0,"right":20,"bottom":20,"left":70}' data-useoffset = "false" data-ycols = '[{"ycol":"violent-crime-rate","label":"Violent Crimes Per 100k People","title": "Violent Crime Rate Over Time"},{"ycol":"population","label":"Population","title": "U.S. Population Over Time"}]'  data-id = "3"></div>
