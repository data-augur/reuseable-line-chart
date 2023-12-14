import { select, csv, json, isoParse } from "d3";
import { linePlot } from "./line-plot";
import { menu } from "./menu.js";
const csvUrl = [
  "https://gist.githubusercontent.com/",
  "curran/", //User
  "a08a1080b88344b0c8a7", //Id of Gist
  "/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534", //commit
  "/iris.csv", //file Name
].join("");

const parseRow = (d) => {
  d.date = isoParse(d.date);
  d.closingPriceNorm = s.closingPriceNorm * 100;
  d.adjPriceNorm = s.adjPriceNorm * 100;
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

const xValue = (d) => isoParse(d.date);
const yValue = (d) => d.closingPrice;

const margin = {
  top: 30,
  bottom: 50,
  left: 50,
  right: 20,
};
const radius = 5;

const main = async () => {
  //const data = await csv(csvUrl, parseRow);
  const data1 = await json(
    "http://localhost:3000/dayend/adjClose/HUBC",
    parseRow
  );
  console.log("data1: ", data1);

  const options = [
    { value: "closingPrice", text: "Closing Price", type: "quantitative" },
    { value: "adjClose", text: "Adjusted Close", type: "quantitative" },
    { value: "closingPriceNorm", text: "Price Returns", type: "quantitative" },
    { value: "adjCloseNorm", text: "Total Returns", type: "quantitative" },
  ];
  const optionsByValue = new Map(
    options.map((option) => [option.value, option])
  );

  //console.log("type: ", optionsByValue.get("species").type);

  const plot = linePlot()
    .width(width)
    .height(height)
    .xValue(xValue)
    .yValue(yValue)
    .xType("date")
    .yType("quantitative")
    .radius(radius)
    .margin(margin)
    .data(data1);

  // svg.call(plot);
  const columns = [
    "sepal_length",
    "sepal_width",
    "petal_length",
    "petal_width",
  ];

  let index = 0;
  // xMenu.call(
  //   menu()
  //     .id("x-menu")
  //     .labelText("X: ")
  //     .options(options)
  //     .on("change", (value) => {
  //       plot.xValue((d) => d[value]);
  //       plot.xType(optionsByValue.get(value).type);
  //       svg.call(plot);
  //     })
  // );
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
