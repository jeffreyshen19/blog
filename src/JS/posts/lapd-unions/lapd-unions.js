let reports;

d3.csv("/data/lapd-unions/contributions.csv")
  .then(function(data){
    reports = data;
    updateTable();

    d3.select("#dropdown").on("change", updateTable);
  });

function updateTable(){
  let filter = d3.select("#dropdown").node().value,
      data = reports;

  if(filter != "all") data = reports.filter(function(d){
    return d["Candidate First Name"] + " " + d["Candidate Last Name"] == filter;
  });

  // Add table data
  d3.select("#reports").select("tbody").selectAll("tr").remove();
  d3.select("#reports").select("tbody").selectAll("tr")
    .data(data)
    .enter()
    .append("tr")
      .html((d) => `
        <td>${d["Date Report Filed"]}</td>
        <td>${d["Candidate First Name"]} ${d["Candidate Last Name"]}, ${d["Office"]}</td>
        <td>${d3.format(",")(parseInt(d["Amount"]))}</td>
      `);

  // Add totals
  let total = data.reduce(function(a, c){
    return a + parseInt(c["Amount"])
  }, 0);
  d3.select("#total").text(`$${d3.format(",")(total)}`)
}
