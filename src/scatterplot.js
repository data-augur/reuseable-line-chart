import { csv, scaleLinear, extent, axisLeft, axisBottom } from "d3";

export const scatterPlot = async (
  csvUrl,
  parseRow,
  xValue,
  yValue,
  radius,
  margin,
  width,
  height,
  svg
) => {
  const data = await csv(csvUrl, parseRow);

  const x = scaleLinear()
    .domain(extent(data, xValue))
    .range([margin.left, width - margin.right]);

  const y = scaleLinear()
    .domain(extent(data, yValue))
    .range([height - margin.bottom, margin.top]);

  const marks = data.map((d) => ({
    x: x(xValue(d)),
    y: y(yValue(d)),
  }));

  console.log(marks);
  svg
    .selectAll("circle")
    .data(marks)
    .join("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", radius);

  svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(axisLeft(y));

  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(axisBottom(x));
};
