import React from "react";
import "./ProductList.css";
import ProductCard from "./ProductCard";

function ProductList({ products, onProductClick, searchTerm }) {
  return (
    <div className="product-list">
      {products.map((product) => {
        const desc = product.description.toLowerCase();
        const item = product.title.toLowerCase();
        const cat = product.category.toLowerCase();
        const search = searchTerm.toLowerCase();

        if (
          !desc.includes(search) &&
          !item.includes(search) &&
          !cat.includes(search)
        )
          return null;

        return (
          <div
            key={product.id}
            onClick={() => {
              onProductClick(product.id);
            }}
          >
            <ProductCard
              image={product.image}
              price={product.price}
              title={product.title}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
