Promise.all([
  d3.xml('/data/chinese-dialects/usa_counties.svg'),
  d3.csv('/data/chinese-dialects/languages.csv')
]).then((data) => {
  // Add svg
  d3.select('#map').node().append(data[0].documentElement);
  let svg = d3.select("svg");

  // Join data

  // -- First, get proper order of data
  let countyDataDict = {}, countyData = [];
  data[1].forEach(function(d){
    countyDataDict[d["County"]] = d;
  })

  svg.select("#stylegroup").selectAll("path")
    .each(function(d) {
      let name = d3.select(this).select("title").text();
      if(name in countyDataDict) countyData.push(countyDataDict[name])
      else countyData.push(null)
    });

  // -- Then, bind data to DOM
  let counties = svg.select("#stylegroup").selectAll("path")
    .data(countyData)

});
