{
  /* <label for="cars">Choose a car:</label>

<select name="cars" id="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select> */
}
import { dispatch } from "d3";

export const menu = () => {
  let id;
  let labelText;
  let options;
  let listners = dispatch("change");

  const my = (selection) => {
    selection
      .selectAll("label")
      .data([null])
      .join("label")
      .attr("for", id)
      .text(labelText);

    selection
      .selectAll("select")
      .data([null])
      .join("select")
      .attr("name", id)
      .attr("id", id)
      .on("change", (event) => {
        console.log(event);
        listners.call("change", null, event.target.value);
      })
      .selectAll("option")
      .data(options)
      .join("option")
      .attr("value", (d) => d.value)
      .text((d) => d.text);
  };

  my.id = function (_) {
    return arguments.length ? ((id = _), my) : id;
  };

  my.labelText = function (_) {
    return arguments.length ? ((labelText = _), my) : labelText;
  };

  my.options = function (_) {
    return arguments.length ? ((options = _), my) : options;
  };

  my.on = function () {
    var value = listners.on.apply(listners, arguments);
    return value === listners ? my : value;
  };
  return my;
};
