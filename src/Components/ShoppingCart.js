import { useState } from "react";
import "./ShoppingCart.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function ShoppingCart({ items, deleteItem }) {
  const navigate = useNavigate();
  // const [total, setTotal] = useState(0);
  let total = 0;
  if (items.length == 0) {
    return (
      <div className="empty-cart">
        <h1>Your cart is empty.</h1>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-body">
        {items.map((item) => {
          total = total + item.price * item.qty;
          return (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} />
              </div>
              <div className="item-details">
                <h1>{item.title}</h1>
                <p>Category: {item.category}</p>
              </div>
              <div className="item-price">
                <h1>${item.price.toFixed(2)}</h1>
                <p>Qty: {item.qty}</p>
                <button
                  onClick={() => {
                    deleteItem(item);
                  }}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            </div>
          );
        })}
        <div className="total">
          <h1>Subtotal: ${total.toFixed(2)}</h1>
        </div>
      </div>
      <div className="checkout-card">
        <h2>Subtotal: ${total.toFixed(2)}</h2>
        <button
          onClick={() => {
            navigate("/checkout");
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default ShoppingCart;
