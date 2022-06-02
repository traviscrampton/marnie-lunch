import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Header from "components/Header/Header";
import ResultsList from "components/Results/ResultsList";
import MapWrapper from "components/Map/MapWrapper";
import { ThemeProvider } from "@mui/material/styles";
import theme from "styles/theme";
import Box from "@mui/material/Box";
import Context from "Context/Context";
import addPlaces from "helpers/addPlaces";
import Button from "@mui/material/Button";
import RoomIcon from "@mui/icons-material/Room";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import useMediaQuery from "@mui/material/useMediaQuery";

function App() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const getCenter = useCallback(() => {
    let tempCenter = {
      lat: 37.79113833400986,
      lng: -122.40608434649559,
    } as google.maps.LatLngLiteral;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          tempCenter = {
            lat: position.coords.latitude || 37.79113833400986,
            lng: position.coords.longitude || -122.40608434649559,
          } as google.maps.LatLngLiteral;
        },
        () => {},
        {}
      );
    }
    return tempCenter;
  }, []);

  const [zoom, setZoom] = useState(16);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>(getCenter());
  const [keyword, setKeyword] = useState<string | null>(null);
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const [service, setService] = useState<
    google.maps.places.PlacesService | undefined
  >();
  const [map, setMap] = useState<google.maps.Map>();

  const searchMap = useCallback(
    () =>
      service &&
      service!.nearbySearch(
        {
          location: center!,
          radius: 500,
          type: "restaurant",
          ...(keyword && { keyword }),
        },
        (
          results: google.maps.places.PlaceResult[] | null,
          status: google.maps.places.PlacesServiceStatus
        ) => {
          if (status !== "OK" || !results) return;
          setPlaces(results);
          addPlaces(results, map!);
        }
      ),
    [center, keyword, map, service]
  );

  useEffect(() => {
    if (map && !service) {
      setService(new google.maps.places.PlacesService(map));
    }
  }, [map, service, setService]);

  useEffect(() => {
    if (service && !places.length) {
      searchMap();
    }
  }, [service, places, searchMap]);

  const contextValue = useMemo(
    () => ({
      center,
      keyword,
      map,
      places,
      zoom,
      setCenter,
      setKeyword,
      setMap,
      setPlaces,
      setZoom,
      searchMap,
    }),
    [
      center,
      keyword,
      map,
      places,
      zoom,
      setCenter,
      setKeyword,
      setMap,
      setPlaces,
      setZoom,
      searchMap,
    ]
  );

  const scrollToMap = () => {
    mapRef?.current?.scrollIntoView();
  };

  const scrollToList = () => {
    resultsRef.current?.scrollIntoView();
  };

  return (
    <Context.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <Box className="App" sx={{ width: "100vw", height: "100vh" }}>
          <Header />
          <Box
            sx={{
              display: "flex",
              height: "calc(100vh - 110px);",
              padding: 2,
              flexWrap: "wrap",
            }}
          >
            <ResultsList ref={resultsRef} />
            <MapWrapper ref={mapRef} />
            {isMobile && (
              <Box
                sx={{
                  position: "sticky",
                  bottom: "40px",
                  left: "50%",
                  transform: "translate(-50%)",
                }}
              >
                <Button
                  startIcon={<RoomIcon />}
                  variant="contained"
                  color="primary"
                  sx={{ marginRight: 0.5 }}
                  onClick={scrollToMap}
                >
                  Map
                </Button>
                <Button
                  startIcon={<FormatListBulletedIcon />}
                  variant="contained"
                  color="primary"
                  sx={{ marginLeft: 0.5 }}
                  onClick={scrollToList}
                >
                  List
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </ThemeProvider>
    </Context.Provider>
  );
}

export default App;
