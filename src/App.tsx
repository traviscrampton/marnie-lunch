import { useState, useEffect, useMemo, useCallback } from "react";
import Header from "components/Header/Header";
import ResultsList from "components/Results/ResultsList";
import MapWrapper from "components/Map/MapWrapper";
import { ThemeProvider } from "@mui/material/styles";
import theme from "styles/theme";
import Box from "@mui/material/Box";
import Context from "Context/Context";
import addPlaces from "helpers/addPlaces";

function App() {
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

  return (
    <Context.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <Box className="App" sx={{ width: "100vw", height: "100vh" }}>
          <Header />
          <Box
            sx={{
              display: "flex",
              height: "calc(100vh - 90px);",
              padding: 2,
              flexWrap: "wrap",
            }}
          >
            <ResultsList />
            <MapWrapper />
          </Box>
        </Box>
      </ThemeProvider>
    </Context.Provider>
  );
}

export default App;
