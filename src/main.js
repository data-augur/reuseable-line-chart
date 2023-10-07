import { select, csv } from "d3";
import { scatterPlot } from "./scatter-plot";
import { menu } from "./menu.js";
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

const menuContainer = select("body")
  .append("div")
  .attr("class", "menu-container");

const xMenu = menuContainer.append("div");

const yMenu = menuContainer.append("div");

const xValue = (d) => d.sepal_length;
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
  const options = [
    { value: "sepal_length", text: "Sapal Length", type: "quantitative" },
    { value: "sepal_width", text: "Sapal Width", type: "quantitative" },
    { value: "petal_length", text: "Patal Length", type: "quantitative" },
    { value: "petal_width", text: "Patal Width", type: "quantitative" },
    { value: "species", text: "Species", type: "catagorical" },
  ];
  const optionsByValue = new Map(
    options.map((option) => [option.value, option])
  );

  console.log("type: ", optionsByValue.get("species").type);

  const plot = scatterPlot()
    .width(width)
    .height(height)
    .xValue(xValue)
    .yValue(yValue)
    .xType("quantitative")
    .yType("quantitative")
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
  xMenu.call(
    menu()
      .id("x-menu")
      .labelText("X: ")
      .options(options)
      .on("change", (value) => {
        plot.xValue((d) => d[value]);
        plot.xType(optionsByValue.get(value).type);
        svg.call(plot);
      })
  );
  yMenu.call(
    menu()
      .id("y-menu")
      .labelText("Y: ")
      .options(options)
      .on("change", (value) => {
        plot.yValue((d) => d[value]);
        plot.yType(optionsByValue.get(value).type);
        svg.call(plot);
      })
  );
  svg.call(plot);
  //   setInterval(() => {
  //     index++;
  //     index = index % columns.length;
  //     const column = columns[index];
  //     console.log(column);
  //     plot.xValue((d) => d[column]);
  //     svg.call(plot);
  //   }, 3000);
};

main();
