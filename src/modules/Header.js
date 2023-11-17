import { Box, Avatar } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import "../index.css";

function Header(props) {
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
      <Box className="search">
        <SearchIcon />
        <input className="input" />
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
