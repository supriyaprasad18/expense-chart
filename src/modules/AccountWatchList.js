import { Box, Divider } from "@material-ui/core";

function AccountWatchList() {
  const data = [
    { account: "Sales", thisMonth: 11900, YTD: 7899 },
    { account: "Sales", thisMonth: 11900, YTD: 7899 },
    { account: "Sales", thisMonth: 11900, YTD: 7899 },
    { account: "Sales", thisMonth: 11900, YTD: 7899 },
    { account: "Sales", thisMonth: 11900, YTD: 7899 },
  ];
  return (
    <Box
      style={{ backgroundColor: "white", borderRadius: "1rem", height: "100%" }}
    >
      <Box style={{ display: "flex", padding: "1rem" }}>
        <Box style={{ fontWeight: "bold" }}>Account watchList</Box>
      </Box>
      <Divider />
      <table style={{ padding: "1rem", width: "100%" }}>
        <thead>
          <th
            style={{
              color: "#a9a5a5",
              fontSize: "0.875rem",
              textAlign: "left",
            }}
          >
            Account
          </th>
          <th
            style={{
              color: "#a9a5a5",
              fontSize: "0.875rem",
              textAlign: "left",
            }}
          >
            This Month
          </th>
          <th
            style={{
              color: "#a9a5a5",
              fontSize: "0.875rem",
              textAlign: "left",
            }}
          >
            YTD
          </th>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr style={{ fontSize: "0.875rem", fontWeight: 500 }}>
              <td style={{ width: "60%" }}>{item.account}</td>
              <td>{item.thisMonth}</td>
              <td>{item.YTD}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}

export default AccountWatchList;
