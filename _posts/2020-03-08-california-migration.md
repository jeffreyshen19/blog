---
layout: post
title:  "Exploring Inter-County Migration in California"
subtitle: "As Housing Costs in the Bay and SoCal Have Skyrocketed, Many Californians Have Opted For More Affordable Counties"
categories: Society
source_code: "https://github.com/jeffreyshen19/jshen-personal-blog/tree/master/_code/california-migration"
image: "interstate.jpg"
references: [{
  url: "https://www.census.gov/data/tables/2017/demo/geographic-mobility/county-to-county-migration-2013-2017.html",
  title: "County-to-County Migration Flows: 2013-2017 ACS"
}]
header: centered
caption: "Interstate 10, one of the main routes leaving Los Angeles County."
featured: false
javascript: ["posts/california-migration/california-map.js"]
---

Over the past few years, [many Californians have left](https://www.nytimes.com/2019/12/29/business/economy/california-economy-housing-homeless.html) for other parts of the country, citing housing costs as one of the main reasons. The overwhelming focus on this so-called "California exodus", however, has obscured the significant amount of Californians also moving within the state.

There is evidence that many people are [leaving the Bay Area](https://www.theguardian.com/cities/2019/jul/02/sacramento-california-bay-area-gentrification-rent) to neighboring Sacramento, and I was curious where else in California are people moving from/to. Using data on county to county migration statistics between 2013-2017 from the American Community Survey, I mapped the net migration flux of each county, calculated as the number of Californians moving to this county minus the Californians leaving that county:

<h1 class = "has-text-centered">Migration Between Counties In California, 2013-2017</h1>
<div id = "california-map" class = "california-map">
</div>
<br>

As can be seen, Californians are leaving Los Angeles, San Diego, and the Bay Area in significant numbers, and moving to neighboring areas such as Sacramento and San Bernardino County. This confirms my assumption that many Californians are not only leaving the state, but also moving around within the state to less expensive areas.
