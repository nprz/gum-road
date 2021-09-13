import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Rating from "@material-ui/lab/Rating";
import CircularProgress from "@material-ui/core/CircularProgress";

import { loader } from "graphql.macro";
import { useMutation } from "@apollo/client";
const ADD_REVIEW = loader("../graphql/AddReview.gql");

const useStyles = makeStyles((theme) => ({
  gumRoadButton: {
    background: "#ffffff",
    border: "1px solid #cccccc",
    boxSizing: "border-box",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.2)",
    borderRadius: "4px",
    padding: "8px 16px",
    cursor: "pointer",

    "&:hover": {
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.4)",
    },
  },
  modalContent: {
    position: "absolute",
    padding: 24,
    width: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    top: "20%",
    left: "50%",
    transform: `translate(-50%, -20%)`,
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 24,
  },
  rating: {
    marginBottom: 24,
  },
  input: {
    display: "block",
    width: "100%",
    border: 0,
    marginBottom: 24,
    "&:focus": {
      outline: "none",
    },
  },
  buttonText: {
    display: "flex",
    alignItems: "center",
  },
  loader: {
    marginLeft: 4,
  },
}));

export function GumroadModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [addReview, { loading }] = useMutation(ADD_REVIEW);

  function handleClose() {
    setInputValue("");
    setValue(null);
    setOpen(false);
  }

  async function handleSubmit() {
    await addReview({
      variables: {
        productId: "06150932-979c-427c-ba3e-b7100b263510",
        description: inputValue,
        rating: value,
      },
    });
    handleClose();
  }

  return (
    <>
      <button className={classes.gumRoadButton} onClick={() => setOpen(true)}>
        Add Review
      </button>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.modalContent}>
          <div className={classes.title}>What's your rating?</div>
          <div className={classes.subtitle}>Rating</div>
          <Rating
            name="rating"
            precision={0.5}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            className={classes.rating}
          />
          <div className={classes.subtitle}>Review</div>
          <input
            placeholder="Start typing..."
            value={inputValue}
            className={classes.input}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            disabled={!(inputValue.length && value)}
            onClick={handleSubmit}
            className={classes.gumRoadButton}
          >
            <div className={classes.buttonText}>
              Add review
              {loading && (
                <CircularProgress className={classes.loader} size={15} />
              )}
            </div>
          </button>
        </div>
      </Modal>
    </>
  );
}
