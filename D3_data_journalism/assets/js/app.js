// age (age) versus smokers (smokes)
// poverty (poverty) vesus healthcare (healthcare)

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function(data) {

    // Parse Data/Cast as numbers
 
    data.forEach(function(asdata) {
      asdata.age = +asdata.age;
      asdata.smokes = +asdata.smokes;
    });

    // Create scale functions
   
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.age) * 0.2, d3.max(data, d => d.age) * 1.5])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.age) * 0.2, d3.max(data, d => d.smokes) * 1.5])
      .range([height, 0]);

    // Create axis functions
   
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart

    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Create Circles
  
    //var circlesGroup = 
    chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "15")
    .attr("fill", "orange")
    .attr("opacity", ".5")
    .classed("stateCircle", true);


    chartGroup.append("g").selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d.age))
    .attr("y", d => yLinearScale(d.smokes))
    .attr("r", "15")
    .attr("dy", 3)
    .attr("fill", "pink")
    .attr("opacity", ".5")
    .classed("stateText", true);

    // Create axes labels
    // y axis
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - ((margin.left/2) + 2))
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Smokers (%)")
      .attr("text-anchor", "middle");

    // x axis
    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Age of Smokers")
      .attr("text-anchor", "middle");
  }).catch(function(error) {
    console.log(error);
  });

