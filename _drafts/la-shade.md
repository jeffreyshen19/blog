---
layout: post
title:  ""
subtitle: ""
categories: Society
image: ""
references: []
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
    Histogram
    </section>
    <section class="step">
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    </section>
  </div>
</div>
<br>
<br>
