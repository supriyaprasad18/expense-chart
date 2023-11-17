import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

function Invoices(props) {
  const svgRef = useRef();
  const [open, setOpen] = useState(false);
  const [upload, setUpload] = useState(null);
  const { invoiceData: data } = props;
  const width = 400;
  const height = 240;

  useEffect(() => {
    if (!data || data?.length === 0) return;
    const svg = d3.select(svgRef.current);
    const xScale = d3
      .scaleBand()
      .domain(data?.map((item) => item.label))
      .range([0, width])
      .padding(0.8);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) => {
          return d.value;
        }),
      ])
      .nice()
      .range([height, 0]);

    svg
      .selectAll("rect")
      .data(data)
      .join((enter) => enter.append("rect"))
      .attr("x", (d) => xScale(d.label))
      .attr("y", (d) => {
        return yScale(d.value);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.value))
      .attr("fill", "#25b92e")
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
        <Box style={{ fontWeight: "bold" }}>Invoices owned by you</Box>
        <button
          style={{
            backgroundColor: "#e6e6e6",
            padding: "0.25rem",
            border: "none",
            borderRadius: "0.25rem",
            color: "#008075",
            fontWeight: 600,
          }}
          onClick={() => setOpen(true)}
        >
          New Sales Invoice
        </button>
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
          <g className="x-axis" />
        </svg>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>File Upload</DialogTitle>
        <DialogContent>
          <input
            type="file"
            onChange={(event) => setUpload(event.target.files[0])}
          />
          <div>{upload ? upload.name : null}</div>
        </DialogContent>
        <DialogActions>Submit</DialogActions>
      </Dialog>
    </Box>
  );
}

export default Invoices;
