import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "./Logo";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import FilterMenu from "./FilterMenu";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [currentFilter, setCurrentFilter] = useState<"lowToHigh" | "highToLow">(
    "lowToHigh"
  );

  const handleOpenFilter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Logo />
            <Box sx={{ display: "flex" }}>
              <Button
                aria-controls="filter-menu"
                id="filters-button"
                size="small"
                variant="outlined"
                onClick={handleOpenFilter}
              >
                Filter
              </Button>
              <Search>
                <OutlinedInput
                  placeholder="Search for a restaurant"
                  inputProps={{ "aria-label": "search" }}
                  endAdornment={
                    <InputAdornment position="end">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  }
                />
              </Search>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <FilterMenu anchorEl={anchorEl} open={open} onClose={handleClose} />
    </>
  );
}
