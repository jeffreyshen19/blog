var connection_graphs = Array.apply(null, Array(d3.selectAll(".connection-graph").size()));

function drawConnectionGraph(chart, dataset, graph){
  var padding = {left: 20, right: 20, top: 20, bottom: 20},
      offset = (d3.select("body").node().offsetWidth - d3.select("#body").node().offsetWidth) / 2,
      width = d3.select("#body").node().offsetWidth + 2 * offset - padding.left - padding.right,
      height = (dataset.height || 300),
      radius = 7;

  //Reset graph
  chart.selectAll("*").remove();

  // Create canvas
  var	svg = chart
    .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("transform", "translate(-" + offset + "px,0px)")
    .append("g");

  var color = ["red", "black", "blue", "green"];

  var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody().strength(-75))
    .force("x", d3.forceX(width / 2))
    .force("y", d3.forceY(height / 2));

  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", function(d) { return d.value; });

  var node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(graph.nodes)
    .enter().append("g");

  var circles = node.append("circle")
    .attr("r", radius)
    .attr("fill", function(d) { return color[d.group - 1]; });

  var labels = node.append("text")
    .text(function(d) {
      return d.id;
    })
    .attr('x', radius + 2)
    .attr('y', radius / 2);

  node.append("title")
    .text(function(d) { return d.id; });

  simulation
    .nodes(graph.nodes)
    .on("tick", ticked);

  simulation.force("link")
    .links(graph.links);

  function ticked() {
    node.attr("transform", function(d) {
      d.x = Math.max(radius + padding.left, Math.min(width - radius - padding.right, d.x));
      d.y = Math.max(radius + padding.bottom, Math.min(height - radius - padding.top, d.y));
      return "translate(" + d.x + "," + d.y + ")";
    });

    link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
  }
}

d3.selectAll(".connection-graph").each(function(d, i){
  var chart = d3.select(this),
      dataset = this.dataset;

  // Save data so it doesn't need to be loaded each time.
  d3.json(dataset.json).then(function(graph) {
    connection_graphs[i] = graph;
    drawConnectionGraph(chart, dataset, graph);
  });
});

function initializeConnectionGraph(){
  d3.selectAll(".connection-graph").each(function(d, i){
    var chart = d3.select(this),
        dataset = this.dataset;

    // Save data so it doesn't need to be loaded each time.
    d3.json(dataset.json).then(function(graph) {
      connection_graphs[i] = graph;
      drawConnectionGraph(chart, dataset, graph);
    });
  });
}

function resizeConnectionGraph(){
  d3.selectAll(".connection-graph").each(function(d, i){
    var chart = d3.select(this),
        dataset = this.dataset;

    drawConnectionGraph(chart, dataset, connection_graphs[i]);
  });
}
