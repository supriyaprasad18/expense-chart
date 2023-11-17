import { Box, Avatar, makeStyles, createStyles } from "@material-ui/core";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles((theme) =>
  createStyles({
    search: {
      display: "flex",
      backgroundColor: "#e6e6e6",
      borderRadius: "0.25rem",
      padding: "0.25rem",
    },
    input: { backgroundColor: "inherit !important", border: "none !important" },
  })
);

function Header(props) {
  const classes = useStyles();
  const { randomizeData } = props;
  return (
    <Box
      style={{
        display: "flex",
        padding: "1rem",
        alignItems: "center",
        gap: "1rem",
        justifyContent: "flex-end",
      }}
    >
      <Box className={classes.search}>
        <SearchIcon />
        <input className={classes.input} />
      </Box>
      <NotificationsIcon />
      <Avatar />
      <ArrowDropDownIcon
        onClick={() => {
          randomizeData();
        }}
      />
    </Box>
  );
}

export default Header;
