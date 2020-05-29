Promise.all([d3.xml("/data/chinese-dialects/usa_counties.svg"),d3.csv("/data/chinese-dialects/languages.csv")]).then(a=>{d3.select("#map").node().append(a[0].documentElement);let b=d3.select("svg"),c={},d=[];// Join data
// -- First, get proper order of data
a[1].forEach(function(a){c[a.County]=a}),b.select("#stylegroup").selectAll("path").each(function(){let a=d3.select(this).select("title").text();a in c?d.push(c[a]):d.push(null)});// -- Then, bind data to DOM
b.select("#stylegroup").selectAll("path").data(d)});