window.addEventListener("load", (event) => {
  async function fetchProduct() {
    const result = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query GetProduct($productId: ID!) {
          product(productId: $productId) {
            id
            title
            reviews {
              id
              rating
              description
            }
          }
        }
      `,
        variables: {
          productId: "06150932-979c-427c-ba3e-b7100b263510",
        },
      }),
    });
    return await result.json();
  }

  async function addReview(rating, description) {
    const result = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        mutation AddReview($productId: ID!, $rating: Int!, $description: String) {
          addReview(productId: $productId, rating: $rating, description: $description) {
            id
            rating
            description
          }
        }
      `,
        variables: {
          productId: "06150932-979c-427c-ba3e-b7100b263510",
          description,
          rating,
        },
      }),
    });
    return await result.json();
  }

  async function setValues() {
    const {
      data: { product: { title, reviews = [] } = {} },
    } = await fetchProduct();

    const productTitle = document.getElementById("product-title");
    productTitle.innerHTML = title;

    const average =
      reviews.reduce((prev, { rating }) =>
        typeof prev === "object" ? prev.rating : prev + rating
      ) / reviews.length;
    const [averageContainer] = document.getElementsByClassName("average");
    averageContainer.innerHTML = average.toFixed(1);

    const averageStars = document.getElementsByClassName("average-star");
    for (let i = 0; i < Math.round(average); i++) {
      averageStars[i].style.color = "#ffb200";
    }

    const [reviewContainer] =
      document.getElementsByClassName("review-container");
    reviews.forEach((review) => {
      const completeReviewContainer = document.createElement("div");
      const starContainerComplete = document.createElement("div");
      completeReviewContainer.className = "complete-review";
      starContainerComplete.className = "star-container-complete";

      const stars = new Array(5).fill(undefined);
      stars.forEach((star, index) => {
        const newStar = document.createElement("i");
        newStar.className = "bi bi-star-fill";
        if (index < review.rating) {
          newStar.style.color = "#ffb200";
        }
        starContainerComplete.appendChild(newStar);
      });

      const completeRating = document.createElement("div");
      const completeReview = document.createElement("div");
      completeRating.className = "complete-rating bold";
      completeReview.className = "complete-description";
      completeRating.innerHTML = review.rating;
      completeReview.innerHTML = review.description
        ? `, ${review.description}`
        : "";
      completeReviewContainer.appendChild(starContainerComplete);
      completeReviewContainer.appendChild(completeRating);
      completeReviewContainer.appendChild(completeReview);

      reviewContainer.appendChild(completeReviewContainer);
    });
  }

  setValues();

  async function createReview(rating, description) {
    await addReview(rating, description);
    const completeReviews = document.getElementsByClassName("complete-review");
    for (let i = 0; i < completeReviews.length; i++) {
      completeReviews[i].remove();
    }
    setValues();
  }

  const starContainer = document.getElementById("star-container");

  function iterateChildren(container, cb) {
    for (let i = 0; i < container.children.length; i++) {
      cb(i);
    }
  }

  const values = {
    hoverValue: null,
    currentValue: null,
  };

  const valuesProxy = new Proxy(values, {
    set: (target, key, value) => {
      target[key] = value;
      if (key === "hoverValue" && value !== null) {
        iterateChildren(starContainer, (i) => {
          starContainer.children[i].style.color =
            i + 1 <= value ? "#ffb200" : "#646464";
        });
      } else {
        iterateChildren(starContainer, (i) => {
          starContainer.children[i].style.color =
            i + 1 <= valuesProxy.currentValue ? "#ffb200" : "#646464";
        });
      }
      return true;
    },
  });

  iterateChildren(starContainer, (i) => {
    starContainer.children[i].onclick = () =>
      (valuesProxy.currentValue = i + 1);
    starContainer.children[i].onmouseover = () =>
      (valuesProxy.hoverValue = i + 1);
    starContainer.children[i].onmouseout = () =>
      (valuesProxy.hoverValue = null);
  });

  let inputValue;
  const input = document.getElementById("description-id");
  input.addEventListener("change", (e) => (inputValue = e.target.value));

  const submitButton = document.getElementById("submit-button");
  submitButton.onclick = (e) => {
    if (values.currentValue && inputValue) {
      createReview(valuesProxy.currentValue, inputValue);
    }
  };
});
