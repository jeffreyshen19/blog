let reports;d3.csv("/data/lapd-unions/contributions.csv").then(function(a){reports=a,updateTable(),d3.select("#dropdown").on("change",updateTable)});function updateTable(){let a=d3.select("#dropdown").node().value,b=reports;"all"!=a&&(b=reports.filter(function(b){return b["Candidate First Name"]+" "+b["Candidate Last Name"]==a})),d3.select("#reports").select("tbody").selectAll("tr").remove(),d3.select("#reports").select("tbody").selectAll("tr").data(b).enter().append("tr").html(a=>`
        <td>${a["Date Report Filed"]}</td>
        <td>${a["Candidate First Name"]} ${a["Candidate Last Name"]}, ${a.Office}</td>
        <td>${d3.format(",")(parseInt(a.Amount))}</td>
      `);// Add totals
let c=b.reduce(function(b,a){return b+parseInt(a.Amount)},0);d3.select("#total").text(`$${d3.format(",")(c)}`)}