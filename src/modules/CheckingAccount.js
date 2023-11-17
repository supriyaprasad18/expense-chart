import {
  Box,
  Divider,
  Menu,
  MenuList,
  Typography,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const useStyles = makeStyles((theme) =>
  createStyles({
    date: { border: "none !important" },
  })
);

function CheckingAccount(props) {
  const classes = useStyles();
  const width = 400;
  const height = 240;
  const svgRef = useRef();
  const { random, setRandom, accountData: data, randomizeData } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [startDate, setStartDate] = useState(new Date());
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleManage = () => {
    setRandom(true);
    handleClose();
  };

  const constructGraph = async () => {
    const svg = d3.select(svgRef.current);
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 400]);
    const line = d3
      .line()
      .x((d) => d.x)
      .y((d) => 240 - d.y)
      .curve(d3.curveBasis);
    svg
      .select(".path")
      .datum(data)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "#25b92e")
      .attr("stroke-width", 2);

    const xAxis = d3.axisBottom(xScale);

    svg
      .select(".x-axis")
      .style("transform", "translateY(220px)")
      .call(xAxis)
      .call((g) => g.select(".domain").remove());
    svg.selectAll(".tick line").attr("stroke-width", 0);
  };
  useEffect(() => {
    randomizeData();
  }, [random]);
  useEffect(() => {
    constructGraph();
  }, [data]);

  return (
    <Box
      style={{ backgroundColor: "white", borderRadius: "1rem", height: "100%" }}
      className="item"
    >
      <Box
        style={{
          display: "flex",
          padding: "1rem",
          justifyContent: "space-between",
          height: "15%",
        }}
      >
        <Typography style={{ fontWeight: "bold" }}>Checking account</Typography>
        <Box style={{ display: "flex", gap: "1rem" }}>
          <Box>
            <button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              style={{
                border: "0.1rem solid #e6e6e6",
                borderRadius: "0.25rem",
                padding: "0.25rem",
                cursor: "pointer",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              Manage
              <KeyboardArrowDownIcon />
            </button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuList onClick={handleManage}>Sales</MenuList>
              <MenuList onClick={handleManage}>Advertising</MenuList>
              <MenuList onClick={handleManage}>Inventory</MenuList>
              <MenuList onClick={handleManage}>Entertainment</MenuList>
              <MenuList onClick={handleManage}>Product</MenuList>
            </Menu>
          </Box>
          <Box
            style={{
              border: "0.1rem solid #e6e6e6",
              borderRadius: "0.25rem",
              padding: "0.25rem",
              cursor: "pointer",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              height: "fit-content",
            }}
          >
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MMMM"
              showMonthYearPicker
              placeholderText="January"
              className={classes.date}
            />
            <KeyboardArrowDownIcon />
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          height: "70%",
        }}
      >
        <svg
          ref={svgRef}
          width={width}
          height={height}
          style={{ overflow: "visible" }}
        >
          <g className="x-axis" />
          <path className="path" />
        </svg>
      </Box>
    </Box>
  );
}

export default CheckingAccount;
