import Context from "Context/Context";
import { useContext, memo } from "react";
import Box from "@mui/material/Box";
import ResultsItem from "./ResultsItem";
import useMediaQuery from "@mui/material/useMediaQuery";

function ResultsList() {
  const value = useContext(Context);
  if (!value) {
    throw new Error("Could not find context value");
  }
  const isMobile = useMediaQuery("(max-width:600px)");
  const places = value?.places;

  return (
    <>
      <Box
        sx={{
          marginRight: isMobile ? "default" : 2,
          overflowY: "scroll",
          height: !isMobile ? "calc(100vh - 100px)" : "default",
          flex: "1 1 20em",
        }}
      >
        {places.map(
          (restaurant: google.maps.places.PlaceResult, index: number) => (
            <ResultsItem key={restaurant.name! + index} result={restaurant} />
          )
        )}
      </Box>
    </>
  );
}

export default memo(ResultsList);
