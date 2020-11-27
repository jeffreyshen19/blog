---
layout: post
title:  "Are Libraries in Los Angeles Within Walking Distance?"
subtitle: "Exploring how accessible public libraries in L.A. County are, using GIS.  "
categories: Society
source_code: "https://github.com/jeffreyshen19/jshen-personal-blog/tree/master/_code/library-equality"
image: "library/westwood.jpeg"
references: [{
    "url": "https://egis3.lacounty.gov/dataportal/tag/libraries/",
    "title": "Library Locations in Los Angeles County Shapefile"
  },  
  {
    "url": "https://www.census.gov/cgi-bin/geo/shapefiles/index.php?year=2019&layergroup=Block+Groups",
    "title": "Los Angeles County Census Block Groups Shapefile (2017)"
  },
  {
    "url": "https://egis3.lacounty.gov/dataportal/drp_county_boundary/",
    "title": "Los Angeles County Boundary Shapefile"
  },
  {
    "url": "https://factfinder.census.gov/faces/tableservices/jsf/pages/productview.xhtml?pid=ACS_17_5YR_B19301&prodType=table",
    "title": "Per Capita Income by Census Block Group (2017)"
  },
  {
    "url": "https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml?refresh=t",
    "title": "Race and Hispanic Origin by Census Block Group (2017)"
  },
]
header: centered
caption: "The Westwood Public Library, just a ten minute walk away from where I grew up."
featured: false
---

LOS ANGELES, CA — I grew up just a few blocks away from the Westwood Public Library, and I spent nearly every Saturday there, reading in the stacks or playing online games on the computers. With busy parents and the limited Internet of the early 2000s, the local library was my connection to the outside world, and it was there that I was first exposed to computers, history, science, and many of my other interests.

Libraries have always been incredibly important and formative institutions to me, but I do not think I would have been able to go to my local library if it was farther away. Los Angeles is not known to be a very walkable city, and I wondered if libraries were just as accessible to other communities. I decided to find out, using GIS.

To start off, how far away is the local library from the average Angelino? Using a [dataset](https://egis3.lacounty.gov/dataportal/tag/libraries/) containing all public library locations in Los Angeles and the [2017 Census block groups](https://www.census.gov/cgi-bin/geo/shapefiles/index.php?year=2019&layergroup=Block+Groups), I calculated the distance between the centroid of each census block group and the nearest library.

As can be seen below, most census block groups are actually within walking distance of a local library, with the average distance to a library being 1,696 meters, or roughly a twenty minute walk.  Though many of the more mountainous regions in the north of Los Angeles County are beyond walking distance of a library, likely due to their rural nature, libraries in the urban areas of the county are very accessible, even by foot. (Because census block groups in the northern part of L.A. County are less dense, they are also larger, meaning their centroids tend to be farther away from libraries—in other words, local libraries are likely closer to residents of these northern census blocks than this measurement makes it appear).

{% include graphs/image.html url = "library/distance_to_library.png" caption = "Distance to the nearest library, calculated from the centroid of a Census block group." %}

Additionally, looking at the racial and economic demographics of Los Angeles County, it appears that libraries are mostly equitably distributed around the city. Though wealthier census block groups with a majority of non-Hispanic white residents tend to be farther away from public libraries, no other groups are disproportionately farther away from local libraries.  (Demographics for Native Hawaiian, Pacific Islander, Native American, and Alaska Native are not shown because there is not a statistically large enough population within Los Angeles County).

{% include graphs/image.html url = "library/race.png" caption = "Racial demographics of Los Angeles County. Data from 2017 U.S. Census." %}
{% include graphs/image.html url = "library/per-capita-income.png" caption = "Per capita income in Los Angeles County. Data from 2017 U.S. Census." %}

Overall, these results suggest that libraries in Los Angeles County are doing a good job serving the adjacenct community. Besides a handful of rural, wealthy communities, most libraries are within walking distance of L.A. residents.
