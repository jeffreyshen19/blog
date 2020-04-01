---
layout: post
title:  ""
subtitle: ""
categories: Society
image: ""
references: [{
    "url": "https://www.fs.usda.gov/detailfull/r5/communityforests/?cid=fseprd647442&width=full",
    "title": “Urban Tree Canopy in California“
},
{
    "url": "https://data.census.gov/cedsci/table?q=s1901&hidePreview=false&tid=ACSST1Y2012.S1901&vintage=2018",
    "title": “Median Annual Income (2012 American Community Survey)“
},
{
    "url": "https://www.nytimes.com/2019/12/01/us/los-angeles-shade-climate-change.html",
    "title": "‘Turn Off the Sunshine’: Why Shade Is a Mark of Privilege in Los Angeles"
},
{
    "url": "https://99percentinvisible.org/episode/shade/",
    "title": "Shade — 99% Invisible"
}]
header: jumbotron
caption: ""
featured: true
container_class: "wider"
javascript: ["posts/la-shade/la-shade.js"]
---

Los Angeles is famous for its sunny and warm weather, yet too much sunshine is a growing issue, as global climate change is bringing more and more days of [extreme heat](https://www.nytimes.com/2017/06/22/us/california-today-extreme-heat.html) to the city. This problem is exacerbated by the lack of trees in L.A., which provide shade, improve air quality, and make public spaces more pleasant.

Trees, however, are not equitably distributed throughout L.A. Beverly Hills Boulevard, for example, is lined with many mature trees that provide a lot of shade. In contrast, in many poorer neighborhoods, trees were actually cut down as part of “tough on crime” enforcement policies, because the city believed that dense tree canopies could [promote crime](https://99percentinvisible.org/episode/shade/) and be used to [stash drugs and guns](https://www.nytimes.com/2019/12/01/us/los-angeles-shade-climate-change.html).

So, just how unequally are trees distributed throughout Los Angeles? I decided to quantify the issue, using GIS and [satellite imagery of L.A.](https://www.fs.usda.gov/detailfull/r5/communityforests/?cid=fseprd647442&width=full)
<br>
<br>

<div id = 'scrolling-vis' class = "columns">
  <div id = 'vis' class = "column">
    <!-- <div id = "map"></div> -->
    <div id = "graph"></div>
    <img id = "img1" src = "/assets/graphics/posts/la-shade/tree-canopy.png">
    <img id = "img2" src = "/assets/graphics/posts/la-shade/tree-canopy-tracts.png">
    <img id = "img3" src = "/assets/graphics/posts/la-shade/income.png">
  </div>
  <div id = 'sections' class = "column is-narrow">
    <section class="step" style = "margin-top: 170px;">
    Here's a map of where trees are located in the Greater Los Angeles area, marked by green dots.
    </section>  
    <section class="step">
    Importantly, this map shows the tree canopy (the area covered by leaves, branches, etc. when viewed from a satellite), rather than individual trees.
    </section>
    <section class="step">
    Then, we can combine this data with the census tracts in the L.A. area. This map shows the percentage of area in a given tract which is covered by trees.
    </section>
    <section class="step">
    You'll notice that South L.A. has minimal tree coverage, while neighborhoods in North L.A. and the Palos Verdes Peninsula have significant tree coverage.
    </section>
    <section class="step">
    Compare this to a map of median income (2012). These maps are nearly identical—the wealthier the neighborhood, the more trees there are.
    </section>
    <section class="step">
    To make the income disparities in tree coverage even more apparent, here's the distribution of tree coverage for low income census tracts (median annual income less than $42,000).
    <label class="help">(Income categorizations from the <a href = "https://www.pewsocialtrends.org/2016/05/11/americas-shrinking-middle-class-a-close-look-at-changes-within-metropolitan-areas/">Pew Research Center</a>)</label>
    </section>
    <section class="step">
    On average, low income census tracts only have 6% tree coverage.
    </section>
    <section class="step">
    Similarly, middle income census tracts (median annual income between $42,000 and $125,000) have slightly higher tree coverage, with an average of 9.8% coverage.
    </section>
    <section class="step">
    Compare that to upper income tracts (median annual income greater than $125,000), which have 23.4% coverage on average, and a high of 45% coverage!
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    </section>
  </div>
</div>
As can be seen, trees—and the shade, improved air quality, and aesthetic benefits they bring—are inequitably distributed throughout Los Angeles, with wealthy neighborhoods having, on average, more tree coverage than low or middle income neighborhoods. It is important that we make sure all L.A. residents have access to ample tree coverage, in order to help mitigate climate change's effects and bring about environmental justice in the city.
