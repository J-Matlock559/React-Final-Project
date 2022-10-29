import { useState } from "react";
import "./ProductPage.css";

function ProductPage({
  qty,
  id,
  title,
  price,
  category,
  desc,
  image,
  rating,
  count,
  updateCart,
}) {
  const [quantity, setQuantity] = useState(1);
  const product = {
    qty: qty,
    id: id,
    title: title,
    price: price,
    category: category,
    desc: desc,
    image: image,
    rating: rating,
    count: count,
  };
  return (
    <div className="product-page-container">
      <div className="product-page-image">
        <img src={image} />
      </div>
      <div className="product-details-container">
        <div className="product-page-title">
          <h3>{title}</h3>
          <p className="dib">{rating} Stars</p>
          <p className="dib">{count} ratings</p>
          <p>Category: {category}</p>
        </div>
        <div className="product-page-desc">
          {/* <h2>${price.toFixed(2)}</h2> */}
          <p>{desc}</p>
          <button
            onClick={() => {
              product.qty = quantity;
              updateCart(product);
            }}
          >
            Add to Cart
          </button>
          <input
            type="number"
            defaultValue={1}
            onChange={(e) => {
              setQuantity(e.target.valueAsNumber);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
