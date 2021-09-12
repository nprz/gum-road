async function product(parent, { productId }, { prisma }) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      reviews: true,
    },
  });

  if (!product) {
    throw new Error(`Unable to find product with id: ${productId}`);
  }

  return product;
}

module.exports = {
  product,
};
