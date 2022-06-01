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
  active: boolean;
  avatarUrl?: string;
  favorite?: boolean;
  numberOfReviews: number;
  rating?: number;
  subtitle?: string;
  title: string;
  onClick: () => void;
}

function ResultsItem({
  active,
  avatarUrl = defaultAvatar,
  favorite,
  numberOfReviews,
  rating,
  subtitle,
  title,
  onClick,
}: Props) {
  return (
    <Card sx={{ border: "0.5px solid #CCCCCC" }}>
      <Box sx={{ display: "flex", padding: 1, paddingBottom: 1 }}>
        <Box
          sx={{ display: "flex", alignItems: "flex-start" }}
          onClick={onClick}
        >
          <Avatar
            alt={`${title}-photo`}
            sx={{ width: 60, height: 60 }}
            srcSet={avatarUrl}
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
            <Typography variant="h6">{title}</Typography>
            <Box sx={{ display: "flex" }}>
              <Rating
                name={`${title} rating: ${rating}`}
                color="F5D24A"
                value={rating}
                precision={1}
                readOnly
                size="small"
                emptyIcon={<StarIcon fontSize="inherit" />}
              />
              <Typography sx={{ marginLeft: 0.4 }} variant="caption">
                ({numberOfReviews})
              </Typography>
            </Box>
            {subtitle && <Typography variant="caption">{subtitle}</Typography>}
          </Box>
        </Box>
        <Box onClick={() => console.log("favorite")}>
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
