import { Grid } from "@material-ui/core";
import CheckingAccount from "./CheckingAccount";
import Invoices from "./Invoices";
import TotalCashFlow from "./TotalCashFlow";
import AccountWatchList from "./AccountWatchList";

function MainContainer(props) {
  const {
    random,
    setRandom,
    accountData,
    totalData,
    invoiceData,
    randomizeData,
  } = props;
  return (
    <Grid container spacing={2} style={{ padding: "1rem" }}>
      <Grid item sm={6}>
        <CheckingAccount
          random={random}
          setRandom={setRandom}
          accountData={accountData}
          randomizeData={randomizeData}
        />
      </Grid>
      <Grid item sm={6}>
        <Invoices
          random={random}
          setRandom={setRandom}
          invoiceData={invoiceData}
        />
      </Grid>
      <Grid item sm={6}>
        <TotalCashFlow
          random={random}
          setRandom={setRandom}
          totalData={totalData}
        />
      </Grid>
      <Grid item sm={6}>
        <AccountWatchList random={random} setRandom={setRandom} />
      </Grid>
    </Grid>
  );
}

export default MainContainer;
