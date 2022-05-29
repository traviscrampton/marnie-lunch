import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import defaultAvatar from "images/defaultAvatar.jpeg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";

interface Props {
  active: boolean;
  avatarUrl?: string;
  favorite?: boolean;
  numberOfReviews: number;
  rating: number;
  subtitle?: string;
  title: string;
  onClick: () => void;
}

function ResultsItem({
  active,
  avatarUrl,
  favorite,
  numberOfReviews,
  rating,
  subtitle,
  title,
  onClick,
}: Props) {
  return (
    <Card>
      <CardContent sx={{ display: "flex" }}>
        <Avatar
          alt={`${title}-photo`}
          sx={{ width: 50, height: 50 }}
          srcSet={defaultAvatar}
          variant="rounded"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "flex-start",
            alignItems: "left",
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
              (${numberOfReviews})
            </Typography>
          </Box>

          {subtitle && <Typography>{subtitle}</Typography>}
        </Box>
        <div>{favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}</div>
      </CardContent>{" "}
    </Card>
  );
}

export default ResultsItem;
