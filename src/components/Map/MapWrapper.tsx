import Context from "Context/Context";
import { useContext } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Map from "./Map";

const render = (status: Status): any => {
  if (status === Status.FAILURE) return <Box>error</Box>;
  return <CircularProgress color="primary" />;
};

function MapWrapper() {
  const value = useContext(Context);
  if (!value) {
    throw new Error("Could not find context value");
  }
  const setCenter = value?.setCenter;
  const setZoom = value?.setZoom;

  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    setZoom(m.getZoom()!);
    m.getCenter() && setCenter(m.getCenter()!.toJSON());
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(100vh - 100px)",
        flex: "2 2 20em",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          border: "3px solid red",
        }}
      >
        <Wrapper
          apiKey={process.env.REACT_APP_NOT_SECRET_GOOGLE_API_KEY!}
          libraries={["places"]}
          render={render}
        >
          <Map onIdle={onIdle} style={{ flexGrow: "1", height: "100%" }} />
        </Wrapper>
      </div>
    </Box>
  );
}

export default MapWrapper;
