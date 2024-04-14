var projectName = "scatter-plot";

var url =
  "https://raw.githubusercontent.com/VictorHugo1320/Examen-Herramientas-Visualizacion/main/alumnos.json";
var margin = {
    top: 100,
    right: 20,
    bottom: 30,
    left: 60,
  },
  width = 400 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

var x = d3.scaleLinear().range([0, width]);

var y = d3.scaleTime().range([0, height]);

var color = d3.scaleOrdinal(d3.schemeCategory10);

var xAxis = d3.axisBottom(x).tickFormat(d3.format(".2"));

var yAxis = d3.axisLeft(y).tickFormat(d3.format("d"));


//Definimos el div para el tooltip
var div = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .attr("id", "tooltip")
  .style("opacity", 0);

var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("class", "graph")
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Cargamos los datos
d3.json(url)
  .then((data) => {
    data.forEach(function (d) {
      d.nota = +d.nota;
      d.ranking = +d.ranking;
    });

    x.domain([
      d3.min(data, function (d) {
        return d.nota;
      }),
      d3.max(data, function (d) {
        return d.nota;
      }),
    ]);
    y.domain([
      d3.min(data, function (d) {
        return d.ranking;
      }),
      d3.max(data, function (d) {
        return d.ranking;
      }),
    ]);
      svg
      .append("g")
      .attr("class", "x axis")
      .attr("id", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "x-axis-label")
      .attr("x", width)
      .attr("y", -70)
      .style("text-anchor", "end")
      .text("Nota");


    svg
      .append("g")
      .attr("class", "y axis")
      .attr("id", "y-axis")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -160)
      .attr("y", -44)
      .style("font-size", 18)
      .text("");

    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("r", 6)
      .attr("cx", function (d) {
        return x(d.nota);
      })
      .attr("cy", function (d) {
        return y(d.ranking);
      })
      .attr("data-xvalue", function (d) {
        return d.nota;
      })
      .attr("data-yvalue", function (d) {
        return d.ranking;
      })
      .style("fill", function (d) {
        return color(d.nota !== "");
      })
      .on("mouseover", function (event, d) {
        div.style("opacity", 0.9);
        div.attr("data-year", d.nota);
        div
          .html(
            "Alumno"+
            ": " +
            d.alumno +
            "<br/>" +
              "Nota " +
              d.nota +
              ", Ranking: " +
              d.ranking
          )
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        div.style("opacity", 0);
      });

    // title
    svg
      .append("text")
      .attr("id", "title")
      .attr("x", width / 2)
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "30px")
      .text("");

    // subtitle
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 0 - margin.top / 2 + 25)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text("Ranking de Alumnos Máestria");

    var legendContainer = svg.append("g").attr("id", "legend");

    var legend = legendContainer
      .selectAll("#legend")
      .data(color.domain())
      .enter()
      .append("g")
      .attr("class", "legend-label")
      .attr("transform", function (d, i) {
        return "translate(0," + (height / 2 - i * 20) + ")";
      });
    
    // subtitle
    

  })
  .catch((err) => console.log(err));