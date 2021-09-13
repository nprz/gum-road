# gum-road

To run the server locally:

- create a .env file with 2 variables `DATABASE_URL` and `SHADOW_DATABASE_URL`. These should point to the URIs of 2 different PostgreSQL databases.
- `$cd server`
- Using node 14 run `$npm i`
- `$npx prisma generate`
- `$node src/index.js`

Server should now be running

To run the client:

- `$npm i`
- `$npm run start`

Architecturally, this project was fairly straight forward. I started with a simple DB diagram, with two tables, one for reviews and one for products. A product has a 1-to-many relationship with reviews. From the DB diagram I was able to create a graphQL server that was used to query porducts, reviews, and create new reviews and new products (the mutation to create new products is not exposed on the client). Once I had these operations in place I was able to build a front end out around the API. On page load, we query a product, its reviews and display the result. The addReview mutation is ran when a user sumbits a new review. One addition I wish I would have made was storing the time at which a review was made. I discovered reviews were returning in reverse order. To remedy this, I reveresed the array on the client side. This works, but is not a robust solution. Storing and sorting by dates would be more reliable.
