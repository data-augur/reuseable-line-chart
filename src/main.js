import { select, csv } from "d3";
import { scatterPlot } from "./scatter-plot";
const csvUrl = [
  "https://gist.githubusercontent.com/",
  "curran/", //User
  "a08a1080b88344b0c8a7", //Id of Gist
  "/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534", //commit
  "/iris.csv", //file Name
].join("");

const parseRow = (d) => {
  d.sepal_length = +d.sepal_length;
  d.petal_width = +d.petal_width;
  d.petal_length = +d.petal_length;
  d.sepal_width = +d.sepal_width;
  return d;
};

const width = window.innerWidth;
const height = window.innerHeight;

const svg = select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const xValue = (d) => d.petal_length;
const yValue = (d) => d.sepal_length;

const margin = {
  top: 30,
  bottom: 50,
  left: 50,
  right: 20,
};
const radius = 5;

const main = async () => {
  //const data = await csv(csvUrl, parseRow);
  const plot = scatterPlot()
    .width(width)
    .height(height)
    .xValue(xValue)
    .yValue(yValue)
    .radius(radius)
    .margin(margin)
    .data(await csv(csvUrl, parseRow));

  // svg.call(plot);
  const columns = [
    "sepal_length",
    "sepal_width",
    "petal_length",
    "petal_width",
  ];
  let index = 0;
  setInterval(() => {
    index++;
    index = index % columns.length;
    const column = columns[index];
    console.log(column);
    plot.xValue((d) => d[column]);
    svg.call(plot);
  }, 3000);
};

main();
