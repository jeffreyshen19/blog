d3.csv("/data/lapd-unions/contributions.csv")
  .then(function(data){
    // Add table data
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
  });
