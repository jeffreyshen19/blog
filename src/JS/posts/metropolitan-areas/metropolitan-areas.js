import scroller from "/dist/JS/scrollytelling/scroller.js";

var scrollVis = function () {
  const width = 600,
        height = 520,
        margin = { top: 0, left: 20, bottom: 40, right: 10 };

  // Which visualization we currently are on
  var lastIndex = -1;
  var activeIndex = 0;

  var activateFunctions = []; //Functions called at the START of each section
  var updateFunctions = []; //Functions called DURING each section (takes a param progress 0.0 - 1.0)

  var map, layers = [];

  /**
   * chart
   *
   * @param selection - the current d3 selection(s)
   *  to draw the visualization in. For this
   *  example, we will be drawing it in #vis
   */
  var chart = function (selection) {
    selection.each(function (data) {
      setupVis(data[0], data[1], data[2], data[3]);
      setupSections();
    });
  };

  // Creates initial elements for all visualizations
  var setupVis = function (cities, urbanAreas, msa, csa) {
    map = L.map('map', {
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    	subdomains: 'abcd',
    }).addTo(map);

    layers[0] = L.geoJSON(cities);
    layers[1] = L.geoJSON(urbanAreas);
    layers[2] = L.geoJSON(msa);
    layers[3] = L.geoJSON(csa);

    for(let i = 0; i < layers.length; i++) {
      hideLayer(layers[i])
      layers[i].addTo(map);
    }
  };

  // Handles display logic for sections
  var setupSections = function () {
    activateFunctions[0] = function(){
      //Hide Los Angeles
      hideLayer(layers[0])

      map.setView([33.9490603, -118.0994376], 10);
    };
    updateFunctions[0] = function() {};

    activateFunctions[1] = function(){
      // Show Los Angeles
      layers[0].eachLayer(function (layer) {
        if(layer.feature.properties.NAME == 'Los Angeles') {
          map.flyToBounds(layer.getBounds(), {'duration': 0.5})
          showLayer(layer, "blue");
        }
      });
    };
    updateFunctions[1] = function() {};
  };

  /**
   * activate -
   *
   * @param index - index of the activated section
   */
  chart.activate = function (index) {
    activeIndex = index;
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function (i) {
      activateFunctions[i]();
    });
    lastIndex = activeIndex;
  };

  /**
   * update
   *
   * @param index
   * @param progress
   */
  chart.update = function (index, progress) {
    updateFunctions[index](progress);
  };

  function hideLayer(layer){
    layer.setStyle({
      fillColor: "none",
      opacity: 0
    });
  }

  function showLayer(layer, color){
    layer.setStyle({
      fillColor: color,
      opacity: 1
    })
  }

  // return chart function
  return chart;
};

// Load data, then display
Promise.all([
  d3.json("/data/metropolitan-areas/cities.geojson"),
  d3.json("/data/metropolitan-areas/urban-areas.geojson"),
  d3.json("/data/metropolitan-areas/msa.geojson"),
  d3.json("/data/metropolitan-areas/csa.geojson"),
]).then(function(data) {
  var plot = scrollVis();

  d3.select('#vis')
    .datum(data)
    .call(plot);

  var scroll = scroller()
    .container(d3.select('#scrolling-vis'));

  scroll(d3.selectAll('.step'));

  scroll.on('active', function (index) {
    d3.selectAll('.step')
      .style('opacity', function (d, i) { return i === index ? 1 : 0.1; });

    plot.activate(index);
  });

  scroll.on('progress', function (index, progress) {
    plot.update(index, progress);
  });
}).catch(function(err) {
    // handle error here
})
