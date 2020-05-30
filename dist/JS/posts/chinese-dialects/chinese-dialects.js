import scroller from"/dist/JS/scrollytelling/scroller.js";const margin={top:50,right:15,bottom:70,left:55};let svg,counties,radiusScale,width=document.getElementById("vis").offsetWidth-margin.left-margin.right-20,height=document.getElementById("vis").offsetHeight-margin.top-margin.bottom,categories=["Chinese (Total)","Chinese (Unspecified)","Mandarin","Cantonese","Hakka","Wu","Kan, Hsiang","Fuchow","Formosan"];var scrollVis=function(){// Which visualization we currently are on
var a=-1,b=0,c=[],d=[],e=function(a){a.each(function(a){f(a),g()})},f=function(a){function b(a){var b=a.getBBox();return[b.x+b.width/2,b.y+b.height/2]}d3.select("#map").style("text-align","center").node().append(a[0].documentElement),svg=d3.select("svg"),svg.select("#State_Lines").style("stroke","white");// Organize data to match it by county
let c={},d=[],e=0;a[1].forEach(function(a){c[a.County]=a}),svg.select("#stylegroup").selectAll("path").style("stroke","white").each(function(){let a=d3.select(this).select("title").text();a in c&&(c[a].center=b(this),c[a].fullName="Baltimore County, MD"==c[a].County||"Baltimore, MD"==c[a].County?c[a].County:c[a].County.split(",")[0]+" County,"+c[a].County.split(",")[1],d.push(c[a]),e=Math.max(e,c[a]["Chinese (Total)"]))}),radiusScale=d3.scaleSqrt().domain([0,e]).range([0,20]),counties=svg.select("#stylegroup").selectAll("circle").data(d).enter().append("circle").style("fill","rgba(102, 51, 153, 0.15)").style("stroke","rgba(102, 51, 153, 0.5)").style("stroke-width",1).attr("cx",a=>a.center[0]).attr("cy",a=>a.center[1]),svg.style("overflow","visible").append("foreignObject").attr("class","tooltip").style("display","none").style("padding",0).style("background","none").attr("width",200).attr("height",200).append("xhtml:div").style("font-size","10px").style("background","#eee").style("padding","7px").style("z-index",100).html(`
          <h1 style = "font-size:12px;text-align:left;"></h1>
          <table class="table is-small">
            <thead>
              <tr>
                <th>Dialect</th>
                <th>Num. Speakers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hakka</td>
                <td>100,000</td>
              </tr>
              <tr>
                <td><strong>Total</strong></td>
                <td><strong>100,000</strong></td>
              </tr>
            </tbody>
          </table>
        `);let f=d3.select(".tooltip");d3.selectAll("circle").on("mouseover",function(a){f.style("display","block"),f.select("h1").text(a.fullName)}).on("mousemove",function(){let a=d3.mouse(this);console.log(a),f.attr("x",a[0]).attr("y",a[1])}).on("mouseout",function(){f.style("display","none")})},g=function(){c[0]=function(){counties.attr("r",function(a){return radiusScale(a["Chinese (Total)"])})},d[0]=function(){}};// return chart function
return e.activate=function(d){b=d;var e=0>b-a?-1:1,f=d3.range(a+e,b+e,e);f.forEach(function(a){c[a]()}),a=b},e.update=function(a,b){d[a](b)},e};// Load data, then display
Promise.all([d3.xml("/data/chinese-dialects/usa_counties.svg"),d3.csv("/data/chinese-dialects/languages.csv")]).then(function(a){var b=scrollVis();d3.select("#vis").datum(a).call(b);var c=scroller().container(d3.select("#scrolling-vis"));c(d3.selectAll(".step")),c.on("active",function(a){d3.selectAll(".step").classed("active",function(b,c){return c===a}).style("opacity",function(b,c){return c===a?1:.1}),b.activate(a)}),c.on("progress",function(a,c){b.update(a,c)});let d;// Handle Resize
d3.select(window).on("resize",function(){clearTimeout(d),d=setTimeout(function(){},50)})}).catch(function(a){// handle error here
console.log(a)});