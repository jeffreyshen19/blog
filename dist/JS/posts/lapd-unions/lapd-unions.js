d3.csv("/data/lapd-unions/contributions.csv").then(function(a){d3.select("#reports").select("tbody").selectAll("tr").data(a).enter().append("tr").html(a=>`
          <td>${a["Date Report Filed"]}</td>
          <td>${a["Candidate First Name"]} ${a["Candidate Last Name"]}, ${a.Office}</td>
          <td>${d3.format(",")(parseInt(a.Amount))}</td>
        `);// Add totals
let b=a.reduce(function(b,a){return b+parseInt(a.Amount)},0);d3.select("#total").text(`$${d3.format(",")(b)}`)});