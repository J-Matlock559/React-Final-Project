import { useState } from "react";
import "./Checkout.css";
import { Link } from "react-router-dom";

function Checkout({ items }) {
  const [address, setAddress] = useState({});
  const [payment, setPayment] = useState({});
  const [showAddress, setShowAddress] = useState("hidden");
  const [showBilling, setShowBilling] = useState("hidden");

  let total = 0;
  let totalQty = 0;
  let tax = 0;

  const addressChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddress((values) => ({ ...values, [name]: value }));
    showAddress = false;
    console.log(address);
  };

  const addressSubmit = (e) => {
    e.preventDefault();
    setShowAddress("visible");
  };

  const paymentChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPayment((values) => ({ ...values, [name]: value }));
  };

  const paymentSubmit = (e) => {
    e.preventDefault();
    setShowBilling("visible");
  };

  const refresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1);
  };

  return (
    <div className="checkout-container">
      <div className="user-details">
        <div className="shipping">
          <h2>1. Shipping Address</h2>
          <form onSubmit={addressSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="username"
                value={address.username || ""}
                onChange={addressChange}
              />
            </label>
            <label>
              Street:
              <input
                type="text"
                name="street"
                value={address.street || ""}
                onChange={addressChange}
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={address.city || ""}
                onChange={addressChange}
              />
            </label>
            <label>
              State:
              <input
                type="text"
                name="state"
                value={address.state || ""}
                onChange={addressChange}
              />
            </label>
            <label>
              Zip Code:
              <input
                type="number"
                name="zip"
                value={address.zip || ""}
                onChange={addressChange}
              />
            </label>
            <input type="submit" />
          </form>
        </div>
        <div className="payment">
          <h2>2. Payment Details</h2>
          <form onSubmit={paymentSubmit}>
            <label>
              Name on Card:
              <input
                type="text"
                name="cardName"
                value={payment.cardName || ""}
                onChange={paymentChange}
              />
            </label>
            <label>
              Card Number:
              <input
                type="number"
                name="cardNumber"
                value={payment.cardNumber || ""}
                onChange={paymentChange}
              />
            </label>
            <label>
              Expiration:
              <input
                type="date"
                name="exp"
                value={payment.exp || ""}
                onChange={paymentChange}
              />
            </label>
            <label>
              Billing Zip Code:
              <input
                type="number"
                name="billingZip"
                value={payment.billingZip || ""}
                onChange={paymentChange}
              />
            </label>
            <input type="submit" />
          </form>
        </div>
        <div className="review">
          <h2>3. Review Items</h2>
          {items.map((item) => {
            total = total + item.qty * item.price;
            totalQty = totalQty + item.qty;
            tax = tax + item.price * 0.08;
            return (
              <div className="checkout-items">
                <div className="checkout-img">
                  <img src={item.image} />
                </div>
                <div className="checkout-details">
                  <h4>{item.title}</h4>
                  <h5>${item.price.toFixed(2)}</h5>
                  <p>Qty: {item.qty}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="place-order">
        <div className="button-div">
          <Link to="/">
            <button className="order-button" onClick={refresh}>
              Complete Your Order
            </button>
          </Link>
        </div>
        <div className="checkout-totals">
          <div>
            <p>Items({totalQty}):</p>
            <p>Shipping: </p>
            <p>Total before tax: </p>
            <p>Tax: </p>
            <p>Total: </p>
          </div>
          <div className="align-right">
            <p>${total.toFixed(2)}</p>
            <p>$0.00</p>
            <p>${total.toFixed(2)}</p>
            <p>${tax.toFixed(2)}</p>
            <p>${(tax + total).toFixed(2)}</p>
          </div>
        </div>
        <div className="checkout-address" style={{ visibility: showAddress }}>
          <p>{address.username}</p>
          <p>{address.street}</p>
          <p>
            {address.city}, {address.state} {address.zip}
          </p>
        </div>
        <div className="checkout-totals" style={{ visibility: showBilling }}>
          <div>
            <p>Name on Card: </p>
            <p>Billing Zip Code: </p>
          </div>
          <div className="align-right">
            <p>{payment.cardName}</p>
            <p>{payment.billingZip}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
