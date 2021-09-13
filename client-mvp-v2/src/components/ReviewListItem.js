import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingStars: {
    marginRight: 8,
  },
  rating: {
    fontWeight: "bold",
  },
  description: {
    marginLeft: 8,
    color: "#929292",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

export function ReviewListItem({ rating, description }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Rating
        value={rating}
        readOnly
        precision={0.5}
        className={classes.ratingStars}
      />
      <div className={classes.rating}>{rating}</div>,
      <div className={classes.description}>{description}</div>
    </div>
  );
}
