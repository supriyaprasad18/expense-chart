import { Box, Divider } from "@material-ui/core";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

function TotalCashFlow(props) {
  const svgRef = useRef();
  const width = 400;
  const height = 240;
  const { totalData: data } = props;

  useEffect(() => {
    if (!data || data.length === 0) return;
    const svg = d3.select(svgRef.current);
    const xScale = d3
      .scaleBand()
      .domain(data?.map((item) => item.label))
      .range([0, width])
      .padding(0.8);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.in)])
      .nice()
      .range([height, 0]);

    const zScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.in)])
      .nice()
      .range([height, 0]);

    svg
      .select(".out")
      .selectAll("rect")
      .data(data)
      .join((enter) => enter.append("rect"))
      .attr("x", (d) => xScale(d.label))
      .attr("y", (d) => {
        console.log(d);
        return yScale(d.value);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.value))
      .attr("fill", "#25b92e")
      .attr("rx", 5);

    svg
      .select(".in")
      .selectAll("rect")
      .data(data)
      .join((enter) => enter.append("rect"))
      .attr("x", (d) => xScale(d.label))
      .attr("y", (d) => zScale(d.in))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - zScale(d.in))
      .attr("fill", "rgb(28 175 162)")
      .attr("rx", 5);

    const xAxis = d3.axisBottom(xScale);
    svg
      .select(".x-axis")
      .style("transform", "translateY(240px)")
      .call(xAxis)
      .call((g) => g.select(".domain").remove());
    svg.selectAll(".tick line").attr("stroke-width", 0);
  }, [data]);

  return (
    <Box
      style={{ backgroundColor: "white", borderRadius: "1rem", height: "100%" }}
    >
      <Box
        style={{
          display: "flex",
          padding: "1rem",
          justifyContent: "space-between",
        }}
      >
        <Box style={{ fontWeight: "bold" }}>Total cash flow</Box>
        <Box style={{ display: "flex", gap: "1rem" }}>
          <Box
            style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
          >
            <div
              style={{
                width: "1rem",
                height: "1rem",
                backgroundColor: "rgb(28 175 162)",
                borderRadius: "0.25rem",
              }}
            />
            In
          </Box>
          <Box
            style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
          >
            <div
              style={{
                width: "1rem",
                height: "1rem",
                backgroundColor: "#25b92e",
                borderRadius: "0.25rem",
              }}
            />
            Out
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <svg ref={svgRef} width={width} height={height} overflow="visible">
          <g className="in" />
          <g className="out" />
          <g className="x-axis" />
        </svg>
      </Box>
    </Box>
  );
}

export default TotalCashFlow;
