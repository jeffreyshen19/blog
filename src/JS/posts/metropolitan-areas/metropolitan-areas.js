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
  let markers = [[[[34.0218948,-118.498265], "Santa Monica"], [[34.0825832,-118.4170435], "Beverly Hills"], [[33.8932864,-118.2393202], "Compton"]], [[[34.0115278,-118.1798982], "East Los Angeles"]], [[[33.8340569,-117.8805115], "Disneyland!"], [[34.137662,-118.1274577], "Caltech"]], [[[34.0432117,-118.2587082], "Downtown L.A."]], [[[34.3023856,-119.3888723], "Ventura"]]];
  let cityMetadata;

  /**
   * chart
   *
   * @param selection - the current d3 selection(s)
   *  to draw the visualization in. For this
   *  example, we will be drawing it in #vis
   */
  var chart = function (selection) {
    selection.each(function (data) {
      setupVis(data[0], data[1], data[2], data[3], data[4]);
      setupSections();
    });
  };

  // Creates initial elements for all visualizations
  var setupVis = function (cities, urbanAreas, msa, csa, metadata) {
    cityMetadata = metadata;

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

    //Add layers
    layers[0] = L.geoJSON(cities);
    layers[1] = L.geoJSON(urbanAreas);
    layers[2] = L.geoJSON(msa);
    layers[3] = L.geoJSON(csa);

    for(let i = 0; i < layers.length; i++) {
      hideLayer(layers[i])
      layers[i].addTo(map);
    }

    //Add markers
    markers = markers.map(function(set){
      return set.map(function(m){
        m = L.marker(m[0], {opacity: 0})
          .bindTooltip(m[1], {
            direction: 'top',
            className: 'label'
          })
          .addTo(map);

        m.closeTooltip();
        return m;
      });
    });

    //Populate dropdown
    d3.select("#dropdown")
      .selectAll(".option")
      .data(metadata)
      .enter()
        .append("option")
        .attr("class", "option")
        .attr("value", (d, i) => i)
        .text((d, i) => (i + 1) + ". " + d.name)

    //Add dropdown and radio handlers
    d3.select("#dropdown").on("change", updateCity);
    d3.selectAll("input[name='show-control']").on("change", updateCity);
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
      findAndShowLayer(layers[0], function(layer){
        return layer.feature.properties.NAME == 'Los Angeles'
      });

      hideMarkers(0);
    };
    updateFunctions[1] = function() {};

    activateFunctions[2] = function(){
      showMarkers(0);
      hideMarkers(1);

      // Show Los Angeles
      findAndShowLayer(layers[0], function(layer){
        return layer.feature.properties.NAME == 'Los Angeles'
      });
    };
    updateFunctions[2] = function() {};

    activateFunctions[3] = function(){
      showMarkers(1);
      hideMarkers(2);

      // Show Los Angeles
      findAndShowLayer(layers[0], function(layer){
        return layer.feature.properties.NAME == 'Los Angeles'
      });

      // Hide Los Angeles Urban Area
      findAndHideLayer(layers[1], function(layer){
        return layer.feature.properties.GEOID10 === "51445"
      }, false);
    };
    updateFunctions[3] = function() {};

    activateFunctions[4] = function(){
      hideMarkers(1);
      hideMarkers(3);
      showMarkers(0);
      showMarkers(2);

      // Show Los Angeles Urban Area and Hide City of Los Angeles
      findAndHideLayer(layers[0], function(layer){
        return layer.feature.properties.NAME == 'Los Angeles'
      }, false);
      findAndShowLayer(layers[1], function(layer){
        return layer.feature.properties.GEOID10 === "51445"
      });
    };
    updateFunctions[4] = function() {};

    activateFunctions[5] = function(){
      hideMarkers(0);
      hideMarkers(2);
      showMarkers(3);

      findAndShowLayer(layers[1], function(layer){
        return layer.feature.properties.GEOID10 === "51445"
      });
    };
    updateFunctions[5] = function() {};

    activateFunctions[6] = function(){
      findAndShowLayer(layers[1], function(layer){
        return layer.feature.properties.GEOID10 === "51445"
      });
      findAndHideLayer(layers[2], function(layer){
        return layer.feature.properties.GEOID === "31080"
      }, false);
    };
    updateFunctions[6] = function() {};

    activateFunctions[7] = function(){
      findAndHideLayer(layers[1], function(layer){
        return layer.feature.properties.GEOID10 === "51445"
      }, false);
      findAndShowLayer(layers[2], function(layer){
        return layer.feature.properties.GEOID === "31080"
      });
    };
    updateFunctions[7] = function() {};

    activateFunctions[8] = function(){
      findAndShowLayer(layers[2], function(layer){
        return layer.feature.properties.GEOID === "31080"
      });
      findAndHideLayer(layers[3], function(layer){
        return layer.feature.properties.GEOID === "348"
      }, false);
    };
    updateFunctions[8] = function() {};

    activateFunctions[9] = function(){
      findAndHideLayer(layers[2], function(layer){
        return layer.feature.properties.GEOID === "31080"
      }, false);
      findAndShowLayer(layers[3], function(layer){
        return layer.feature.properties.GEOID === "348"
      });
      hideMarkers(4);
    };
    updateFunctions[9] = function() {};

    activateFunctions[10] = function(){
      showMarkers(4);
    };
    updateFunctions[10] = function() {};

    activateFunctions[11] = function(){
      showMarkers(3);
      hideMarkers(4);
      let dropdownValue = d3.select("#dropdown").property("value");
      let radioValue = d3.select('input[name="show-control"]:checked').node().value;

      if(dropdownValue != "") findAndHideLayer(layers[radioValue], function(layer){
        return layer.feature.properties[cityMetadata[dropdownValue].identifiers[radioValue][0]] === cityMetadata[dropdownValue].identifiers[radioValue][1]
      }, false);
      findAndShowLayer(layers[3], function(layer){
        return layer.feature.properties.GEOID === "348"
      });
    };
    updateFunctions[11] = function() {};

    activateFunctions[12] = function(){
      hideMarkers(3);
      updateCity();
    };
    updateFunctions[12] = function() {};
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

  function hideMarkers(i){
    markers[i].forEach(function(m){
      m.setOpacity(0);
      m.closeTooltip();
    })
  }

  function showMarkers(i){
    //Show markers
    markers[i].forEach(function(m){
      m.setOpacity(1);
      m.openTooltip();
    })
  }

  function findAndShowLayer(layers, goalCondition, fit, callback){
    layers.eachLayer(function (layer) {
      if(goalCondition(layer)) {
        if(fit != false) map.fitBounds(layer.getBounds(), {'duration': 0.5})
        showLayer(layer, "blue");
        if(callback) callback(layer);
        return;
      }
    });
  }

  function findAndHideLayer(layers, goalCondition, fit){
    layers.eachLayer(function (layer) {
      if(goalCondition(layer)) {
        if(fit != false) map.fitBounds(layer.getBounds(), {'duration': 0.5})
        hideLayer(layer);
      }
    });
  }

  function updateCity(){
    let dropdownValue = d3.select("#dropdown").property("value");
    let radioValue = d3.select('input[name="show-control"]:checked').node().value;

    for(let i = 0; i < 4; i++) hideLayer(layers[i]);

    if(dropdownValue != ""){
      //If the city does not have a combined statistical area, hide that option
      if(cityMetadata[dropdownValue].identifiers[3][1] == null){
        if(radioValue == 3){
          radioValue = 0;
          d3.select('input[name="show-control"]:checked').node().checked = null;
          d3.select('#city-boundary').node().checked = true;
        }

        d3.select("#csa").attr("disabled", true);
        d3.select("#csa").select("input").attr("disabled", true);
        d3.select("#csa").select("label").style("display", "block");
      }
      else{
        d3.select("#csa").attr("disabled", null);
        d3.select("#csa").select("input").attr("disabled", null);
        d3.select("#csa").select("label").style("display", "none");
      }

      findAndShowLayer(layers[radioValue], function(layer){
        return layer.feature.properties[cityMetadata[dropdownValue].identifiers[radioValue][0]] === cityMetadata[dropdownValue].identifiers[radioValue][1]
      }, true, function(result){
        let population = result.feature.properties.respop72018;
        d3.select("#population").text(d3.format(".3s")(population));
      });
    }
    else{
      d3.select("#population").text("N/A");
    }
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
  d3.json("/data/metropolitan-areas/city-metadata.json"),
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
      .classed("active", function (d, i) { return i === index })
      .style('opacity', function (d, i) { return i === index ? 1 : 0.1; });

    plot.activate(index);
  });

  scroll.on('progress', function (index, progress) {
    plot.update(index, progress);
  });
}).catch(function(err) {
    // handle error here
})
