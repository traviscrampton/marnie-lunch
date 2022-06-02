import Context from "Context/Context";
import { forwardRef, useContext } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Map from "./Map";

const render = (status: Status): any => {
  if (status === Status.FAILURE) return <Box>error</Box>;
  return <CircularProgress color="primary" />;
};

const MapWrapper = forwardRef((props: {}, ref: React.Ref<HTMLDivElement>) => {
  const value = useContext(Context);
  if (!value) {
    throw new Error("Could not find context value");
  }
  const setCenter = value?.setCenter;
  const setZoom = value?.setZoom;

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    m.getCenter() && setCenter(m.getCenter()!.toJSON());
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(100vh - 110px)",
        flex: "2 2 20em",
      }}
      ref={ref}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
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
});

export default MapWrapper;
