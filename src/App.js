import "./App.css";

import {
  getAllProducts,
  getSingleProduct,
} from "./Utilities/product-utilities";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import ProductList from "./Components/ProductList";
import ProductPage from "./Components/ProductPage";
import ShoppingCart from "./Components/ShoppingCart";
import Checkout from "./Components/Checkout";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [addItem, setAddItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let rating;
  let price;

  const updateCart = (item) => {
    const newCart = [...addItem];
    let dupe = false;

    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].id === item.id) {
        newCart[i].qty = newCart[i].qty + item.qty;
        dupe = true;
      }
    }

    if (newCart.length === 0 || dupe === false) {
      newCart.push(item);
    }

    setAddItem(newCart);
    console.log(newCart);
  };

  const deleteItem = (item) => {
    const newCart = [...addItem];

    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].id === item.id) {
        newCart.splice(i, 1);
      }
      setAddItem(newCart);
    }
  };

  const updateSearch = (term) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const productList = await getAllProducts();
      setProducts(productList);
      setIsLoading(false);
    })();

    // (async () => {
    //   const product = await getSingleProduct();
    //   setSingleProduct(product);
    // })();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Navbar updateSearch={updateSearch} />
        {isLoading ? (
          <div className="spinner">
            <ClipLoader
              color={"#111"}
              loading={isLoading}
              // cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <Routes>
            <Route
              path="/cart"
              element={<ShoppingCart items={addItem} deleteItem={deleteItem} />}
            />
            <Route path="/checkout" element={<Checkout items={addItem} />} />
            <Route
              path="/product"
              element={
                <ProductPage
                  qty={0}
                  id={singleProduct.id}
                  title={singleProduct.title}
                  price={singleProduct.price}
                  category={singleProduct.category}
                  desc={singleProduct.description}
                  image={singleProduct.image}
                  rating={singleProduct.rating.rate}
                  count={singleProduct.rating.count}
                  updateCart={updateCart}
                  addItem={addItem}
                />
              }
            />
            <Route
              path="/"
              element={
                <ProductList
                  products={products}
                  searchTerm={searchTerm}
                  onProductClick={async (prodId) => {
                    const clickedProduct = await getSingleProduct(prodId);
                    setSingleProduct(clickedProduct);
                  }}
                />
              }
            />
          </Routes>
        )}
        <Navbar />
      </div>
    </BrowserRouter>
  );
}

export default App;
