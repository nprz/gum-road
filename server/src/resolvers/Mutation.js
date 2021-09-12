async function createProduct(parent, { title }, { prisma }) {
  const newProduct = await prisma.product.create({
    data: {
      title,
    },
  });

  if (!newProduct) {
    throw new Error(`Unable to create new product`);
  }

  return newProduct;
}

async function addReview(parent, { productId, rating }, { prisma }) {
  const newReview = await prisma.review.create({
    data: {
      rating,
      productId,
    },
  });

  if (!newReview) {
    throw new Error(`Unable to add review to product ${productId}`);
  }

  return newReview;
}

module.exports = {
  createProduct,
  addReview,
};
