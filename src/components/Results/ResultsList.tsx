import Box from "@mui/material/Box";
import ResultsItem from "./ResultsItem";

interface Props {
  results: google.maps.Place[];
}

function ResultsList({ results }: Props) {
  // if (!results?.length) {
  //   return null;
  // }

  return (
    <Box sx={{ width: "30%", marginRight: 2 }}>
      <ResultsItem
        active={false}
        favorite
        numberOfReviews={4333}
        rating={4.3}
        subtitle="$$$ Subtitle subtitle"
        title="Best Title"
        onClick={() => console.log("clickme")}
      />
    </Box>
  );
}

export default ResultsList;

// {results?.map((result: google.maps.Place) => (
//   <ResultsItem
//     active={false}
//     favorite
//     numberOfReviews={4333}
//     rating={4.3}
//     subtitle="$$$ Subtitle subtitle"
//     title="Best Title"
//     onClick={() => console.log("clickme")}
//   />
// ))}
