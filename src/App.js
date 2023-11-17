import {
  Box,
  List,
  ListItem,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { sidebarItems } from "./constant";
import Header from "./modules/Header";
import { useState } from "react";
import MainContainer from "./modules";

const useStyles = makeStyles((theme) =>
  createStyles({
    drawerStyle: {
      width: "15%",
      height: "100vh",
      position: "fixed",
      backgroundColor:"white"
    },
  })
);

function App() {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState(0);
  const [random, setRandom] = useState(false);
  const [accountData, setAccountData] = useState([
    { x: 0, y: 50 },
    { x: 50, y: 50 },
    { x: 100, y: 100 },
    { x: 150, y: 50 },
    { x: 200, y: 100 },
    { x: 250, y: 50 },
    { x: 300, y: 90 },
    { x: 350, y: 120 },
    { x: 400, y: 100 },
  ]);
  const [invoiceData, setInvoiceData] = useState([
    { label: "Older", value: 10 },
    { label: "Jan 01-08", value: 20 },
    { label: "Jan 09-16", value: 15 },
    { label: "Jan 17-24", value: 10 },
    { label: "Jan 25-31", value: 20 },
    { label: "Future", value: 15 },
  ]);
  const [totalData, setTotalData] = useState([
    { label: "August", value: 10, in: 12 },
    { label: "September", value: 20, in: 25 },
    { label: "October", value: 15, in: 20 },
    { label: "November", value: 10, in: 11 },
    { label: "December", value: 20, in: 22 },
    { label: "January", value: 15, in: 30 },
  ]);
  const randomizeData = () => {
    const tempAccount = accountData.map((item) => {
      return { x: item.x, y: item.y * (Math.random() * 0.3 + 0.7) };
    });
    setAccountData([...tempAccount]);
    const tempInvoice = invoiceData.map((item) => {
      return {
        label: item.label,
        value: item.value * (Math.random() * 0.3 + 0.7),
      };
    });
    setInvoiceData([...tempInvoice]);
    const tempTotal = totalData.map((item) => {
      return {
        label: item.label,
        in: item.in * (Math.random() * 0.3 + 0.7),
        value: item.value * (Math.random() * 0.3 + 0.7),
      };
    });
    setTotalData([...tempTotal]);
    setRandom(false);
  };
  return (
    <Box>
      <Box className={classes.drawerStyle}>
        <List>
          <ListItem>
            <Box style={{ marginBottom: "5rem" }}>
              <img
                src="https://desk.assiduus.in/content/images/2023/08/Assiduus_TM_Logo--1-.png"
                width="70%"
              />
            </Box>
          </ListItem>

          {sidebarItems.map((item, index) => (
            <ListItem
              onClick={() => setSelectedItem(index)}
              style={{
                backgroundColor: index === selectedItem ? "#25b92e" : "white",
                color: index === selectedItem ? "white" : "black",
                cursor: "pointer",
              }}
            >
              {item?.icon}&nbsp;
              {item.text}
            </ListItem>
          ))}
        </List>
      </Box>
      <Header randomizeData={randomizeData} />
      <Box style={{ backgroundColor: "#e6e6e6", marginLeft: "15%" }}>
        <MainContainer
          random={random}
          setRandom={setRandom}
          randomizeData={randomizeData}
          accountData={accountData}
          totalData={totalData}
          invoiceData={invoiceData}
        />
      </Box>
    </Box>
  );
}

export default App;
