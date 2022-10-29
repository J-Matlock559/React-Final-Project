import { useEffect, useState } from "react";
import { getAllProducts } from "../Utilities/product-utilities";
import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ image, price, title }) {
  return (
    <Link to="/product" style={{ textDecoration: "none" }}>
      <div className="product-card">
        <div className="card-image">
          <img src={image} />
        </div>
        <div className="product-details">
          <h4>{title}</h4>
          <h2>${price.toFixed(2)}</h2>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
