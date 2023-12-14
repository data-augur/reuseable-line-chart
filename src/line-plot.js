import {
  scaleLinear,
  scalePoint,
  extent,
  axisLeft,
  axisBottom,
  transition,
  timeFormat,
  curveMonotoneX,
  scaleUtc,
  line,
} from "d3";

export const linePlot = () => {
  let width;
  let height;
  let data;
  let xValue;
  let xType;
  let yValue;
  let yType;
  let radius;
  let margin;

  const my = (selection) => {
    let x;
    if (xType === "catagorical") {
      console.log("catagorical found");
      x = scalePoint()
        .domain(data.map(xValue))
        .range([margin.left, width - margin.right])
        .padding(0.2);
    } else if (xType === "date") {
      x = scaleUtc()
        .domain(extent(data, xValue))
        .range([margin.left, width - margin.right]);
    } else {
      x = scaleLinear()
        .domain(extent(data, xValue))
        .range([margin.left, width - margin.right]);
    }

    let y;
    if (yType === "catagorical") {
      console.log("catagorical found");
      y = scalePoint()
        .domain(data.map(yValue))
        .range([height - margin.bottom, margin.top])
        .padding(0.2);
    } else {
      y = scaleLinear()
        .domain(extent(data, yValue))
        .range([height - margin.bottom, margin.top]);
    }

    const marks = data.map((d) => ({
      x: x(xValue(d)),
      y: y(yValue(d)),
    }));
    const t = transition().duration(1000);

    const Pline = line()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(curveMonotoneX);

    selection
      .selectAll("path")
      .data([null])
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", Pline(marks)),
        (update) =>
          update.call((update) =>
            update
              .transition(t)
              .delay((d, i) => i * 5)
              .attr("d", Pline(marks))
          ),
        (exit) => exit.remove()
      );

    selection
      .selectAll("g.x-axis")
      .data([null])
      .join("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .transition(t)
      .call(
        axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
          .tickFormat(timeFormat("%b %Y"))
      );

    selection
      .selectAll("g.y-axis")
      .data([null])
      .join("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .transition(t)
      .call(axisLeft(y).ticks(height / 40));
  };

  my.width = function (_) {
    return arguments.length ? ((width = +_), my) : width;
  };

  my.height = function (_) {
    return arguments.length ? ((height = +_), my) : height;
  };

  my.data = function (_) {
    return arguments.length ? ((data = _), my) : data;
  };

  my.xValue = function (_) {
    return arguments.length ? ((xValue = _), my) : xValue;
  };

  my.yValue = function (_) {
    return arguments.length ? ((yValue = _), my) : yValue;
  };

  my.xType = function (_) {
    return arguments.length ? ((xType = _), my) : xType;
  };

  my.yType = function (_) {
    return arguments.length ? ((yType = _), my) : yType;
  };

  my.margin = function (_) {
    return arguments.length ? ((margin = _), my) : margin;
  };

  my.radius = function (_) {
    return arguments.length ? ((radius = _), my) : radius;
  };
  return my;
};
