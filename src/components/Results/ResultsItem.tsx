import Context from "Context/Context";
import { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import defaultAvatar from "images/defaultAvatar.jpeg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";

interface Props {
  result: google.maps.places.PlaceResult;
}

function ResultsItem({ result }: Props) {
  const photo = result?.photos![0]?.getUrl();
  const [favorite, setFavorite] = useState(false);
  const value = useContext(Context);
  if (!value) {
    throw new Error("Could not find context value");
  }
  const setCenter = value?.setCenter;
  const handleClick = () => {
    const lat = result?.geometry?.location?.lat();
    const lng = result?.geometry?.location?.lng();
    console.log({ lat }, { lng });

    setCenter && lat && lng && setCenter({ lat, lng });
  };

  const handleClickFavorite = () => setFavorite(!favorite);

  return (
    <Card
      sx={{ border: "0.5px solid #CCCCCC", marginBottom: 1, cursor: "pointer" }}
      onMouseEnter={handleClick}
    >
      <Box
        sx={{
          display: "flex",
          padding: 1.25,
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "flex-start" }}
          onClick={handleClick}
        >
          <Avatar
            alt={`${result?.name || "restaurant"}-photo`}
            sx={{ width: 60, height: 60 }}
            srcSet={photo || defaultAvatar}
            variant="square"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: 1,
              marginRight: 1,
            }}
          >
            <Typography variant="h6">{result?.name}</Typography>
            <Box sx={{ display: "flex" }}>
              <Rating
                name={`${result?.name} rating: ${result?.rating}`}
                color="F5D24A"
                value={result?.rating || 0}
                precision={1}
                readOnly
                size="small"
                emptyIcon={<StarIcon fontSize="inherit" />}
              />
              <Typography sx={{ marginLeft: 0.4 }} variant="caption">
                ({result?.user_ratings_total})
              </Typography>
            </Box>
            <Typography variant="caption">$$ More info here</Typography>
          </Box>
        </Box>
        <Box sx={{ cursor: "pointer" }} onClick={handleClickFavorite}>
          {favorite ? (
            <FavoriteIcon color="primary" />
          ) : (
            <FavoriteBorderIcon sx={{ opacity: "0.3" }} />
          )}
        </Box>
      </Box>
    </Card>
  );
}

export default ResultsItem;
