import Header from "components/Header/Header";
import ResultsList from "components/Results/ResultsList";
import MapWrapper from "components/Map/MapWrapper";
import { ThemeProvider } from "@mui/material/styles";
import theme from "styles/theme";
import Box from "@mui/material/Box";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Box
          sx={{
            display: "flex",
            marginTop: 2,
            justifyContent: "center",
          }}
        >
          <ResultsList results={[]} />
          <MapWrapper />
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
