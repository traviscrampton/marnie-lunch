import Context from "Context/Context";
import { useContext, useState } from "react";

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

import useMediaQuery from "@mui/material/useMediaQuery";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(),
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export default function Header() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const value = useContext(Context);
  if (!value) {
    throw new Error("Could not find context value");
  }
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    value?.setKeyword(event.target.value as string);
  };

  const handleSearch = (event: any) => {
    event?.preventDefault();
    value?.searchMap();
  };

  const handleOpenFilter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent" sx={{ boxShadow: 1 }}>
          <Toolbar sx={{ flexWrap: "wrap" }}>
            <Logo />
            <Box
              sx={{
                display: "flex",
                flex: 1,
                justifyContent: isMobile ? "center" : "normal",
                paddingTop: 1,
                paddingBottom: 1,
              }}
            >
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
                <form onSubmit={handleSearch}>
                  <OutlinedInput
                    placeholder="Search for a restaurant"
                    inputProps={{ "aria-label": "search" }}
                    endAdornment={
                      <InputAdornment position="end">
                        <SearchIcon color="primary" />
                      </InputAdornment>
                    }
                    onChange={handleChange}
                  />
                </form>
              </Search>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <FilterMenu anchorEl={anchorEl} open={open} onClose={handleClose} />
    </>
  );
}
