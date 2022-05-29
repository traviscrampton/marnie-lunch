import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ResultsItem from "components/Results/ResultsItem";
import { ThemeProvider } from "@mui/material/styles";
import theme from "styles/theme";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ResultsItem
          active={false}
          numberOfReviews={4333}
          rating={4.3}
          title="Best Title"
          onClick={() => console.log("clickme")}
        />
      </header>
    </div>
  );
}

export default App;
