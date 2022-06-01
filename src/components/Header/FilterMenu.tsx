import { useState } from "react";
import Menu from "@mui/material/Menu";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface Props {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

function FilterMenu({ anchorEl, open, onClose }: Props) {
  const [currentFilter, setCurrentFilter] = useState<"lowToHigh" | "highToLow">(
    "lowToHigh"
  );

  const handleChange = (event: React.SyntheticEvent) => {
    setCurrentFilter(
      (event.target as HTMLInputElement).value as "lowToHigh" | "highToLow"
    );
  };

  const handleClose = () => {
    onClose();
  };

  const handleApplyFilter = () => {
    // set query (which will trigger a re-fetch) and close modal
    handleClose();
  };

  return (
    <Menu
      id="filter-menu"
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "filters-button",
        role: "listbox",
      }}
    >
      <MenuItem>
        <FormControlLabel
          control={
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
            />
          }
          checked={currentFilter === "highToLow"}
          label="Ratings High to Low"
          onChange={handleChange}
          value="highToLow"
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          control={
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
            />
          }
          checked={currentFilter === "lowToHigh"}
          label="Ratings Low to High"
          onChange={handleChange}
          value="lowToHigh"
        />
      </MenuItem>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Button
          sx={{
            textTransform: "inherit",
            fontWeight: 600,
            alignSelf: "flex-end",
          }}
          onClick={handleApplyFilter}
        >
          Apply
        </Button>
      </Box>
    </Menu>
  );
}

export default FilterMenu;
