const url = "https://fakestoreapi.com/products";

const getAllProducts = async () => {
  const result = await fetch(url);
  const productsFound = await result.json();
  return productsFound;
};

const getSingleProduct = async (prodId) => {
  const result = await fetch(`${url}/${prodId}`);
  const productFound = await result.json();
  return productFound;
};

export { getAllProducts, getSingleProduct };
