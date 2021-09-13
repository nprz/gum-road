import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import { GumroadModal } from "./components/GumroadModal";
import { ReviewListItem } from "./components/ReviewListItem";

import { loader } from "graphql.macro";
import { useQuery } from "@apollo/client";
const GET_PRODUCT = loader("./graphql/GetProduct.gql");

const useStyles = makeStyles({
  page: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
  },
  content: {
    width: "50%",
    marginTop: 64,
  },
  titleDetails: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 32,
    borderBottom: "1px solid #b9b9b9",
  },
  averageStars: {
    display: "flex",
    alignItems: "center",
  },
  averageValue: {
    marginRight: 16,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 32,
    marginBottom: 24,
  },
  reviewsContainer: {
    overflow: "scroll",
  },
});

function App() {
  const classes = useStyles();
  const { data: { product: { title, reviews = [] } = {} } = {} } = useQuery(
    GET_PRODUCT,
    {
      variables: {
        productId: "06150932-979c-427c-ba3e-b7100b263510",
      },
      pollInterval: 500,
    }
  );

  const getAverage = useCallback(
    (rounded) => {
      if (!reviews?.length) return;

      if (reviews.length === 1) return reviews[0].rating;

      const avg =
        reviews.reduce((prev, { rating }) =>
          typeof prev === "object" ? prev.rating : prev + rating
        ) / reviews.length;

      return rounded
        ? parseInt((Math.round(avg * 2) / 2).toFixed(1))
        : avg.toFixed(1);
    },
    [reviews]
  );

  return (
    <div className={classes.page}>
      <div className={classes.content}>
        <h1>{title}</h1>
        <div className={classes.titleDetails}>
          <div className={classes.averageStars}>
            <h1 className={classes.averageValue}>{getAverage()}</h1>
            {getAverage(true) && (
              <Rating
                name="average"
                value={getAverage(true)}
                readOnly
                precision={0.5}
              />
            )}
          </div>
          <div>
            <GumroadModal />
          </div>
        </div>
        <div className={classes.subtitle}>Reviews</div>
        <div className={classes.reviewsContainer}>
          {[...reviews]?.reverse()?.map((r) => (
            <ReviewListItem {...r} key={r.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
