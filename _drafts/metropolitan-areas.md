---
layout: post
title:  "What's In A City?"
subtitle: "Exploring the boundaries and metropolitan areas of U.S. cities"
categories: Society
image: "metropolitan.jpg"
references: []
header: jumbotron
caption: ""
featured: true
javascript: ["posts/metropolitan-areas/metropolitan-areas.js"]
---

<div id = 'scrolling-vis' class = "columns">
  <div id = 'vis' class = "column">
    <div id = "map"></div>
  </div>
  <div id = 'sections' class = "column is-narrow">
    <section class="step">
      Let's start with Los Angeles, my home and the second largest city in the U.S.
    </section>
    <section class="step">
      Here are the city boundaries, containing around four million people.
    </section>
    <section class="step">
      You'll notice these boundaries don't actually include many places we think are part of L.A.
    </section>
    <section class="step">
      In fact, Los Angeles proper doesn't even include "East Los Angeles", which is a separate, unincorporated municipality.
    </section>
    <section class="step">
      If we instead look at the "L.A.-Long Beach-Anaheim Urbanized Area" (as determined by the Census), the boundaries fit more of what we expect L.A. to look like.
    </section>
    <section class="step">
      This area, which contains over 12 million people (four million more than New York City), is probably what most people have in mind when they say "Los Angeles."
    </section>
    <section class="step">
      Importantly, this region only includes "urbanized areas", or Census-designated regions with over 50,000 people, which excludes many suburbs and towns that might be considered part of the Greater Los Angeles Area.
    </section>
    <section class="step">
      Another region to consider is the L.A. Metropolitan Statistical Area, which is defined by the U.S. Office of Management and Budget as a region which "consists of a city and surrounding communities that are linked by social and economic factors."
    </section>
    <section class="step">
      This area, which contains over 13.2 million people, does a good job approximating what we think the "Greater Los Angeles Area" looks like.
    </section>
    <section class="step">
      Alternatively, we could consider the L.A. Combined Statistical Area, which is defined as a region containing economically linked metropolitan and micropolitan areas.
    </section>
    <section class="step">
      This region has a population of over 18.7 million people (nearly half of California's population), and contains other cities like Ventura that might also be considered part of the Greater Los Angeles Area.
    </section>
    <section class="step">
      As you can see, there are many different ways to define the boundaries of L.A. and its surrounding metropolitan area. Keep scrolling to explore more U.S. Cities!
    </section>
    <section class="step">
      <div class="field">
        <label class="label">Choose a city</label>
        <div class="control">
          <div class="select">
            <select id = "dropdown" >
              <option value = ""></option>
            </select>
          </div>
        </div>
        <label class="help">(Sorted by population of metropolitan statistical area)</label>
      </div>
      <div class="field">
        <label class="label">Show: </label>
        <div class="control">
          <label class="radio">
            <input type="radio" name="show-control" value = "0" id = "city-boundary" checked>
            City Boundary
          </label>
          <br>
          <label class="radio">
            <input type="radio" name="show-control" value = "1">
            Urbanized Area
          </label>
          <br>
          <label class="radio">
            <input type="radio" name="show-control" value = "2">
            Metropolitan Statistical Area
          </label>
          <br>
          <label class="radio" id = "csa">
            <input type="radio" name="show-control" value = "3">
            Combined Statistical Area
            <label class="help" style="opacity:0">(This city is not part of a combined statistical area)</label>
          </label>
        </div>
      </div>
      <div class="field">
        <label class="label">Population: </label><span id = "population">N/A</span>
      </div>
    </section>
  </div>
</div>
