import React from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHouseChimney,
  faCashRegister,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ updateSearch }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <nav>
        <ul>
          <input
            type="search"
            placeholder="Search for products"
            className="searchBar"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateSearch(search);
                navigate("/");
                e.target.value = "";
              }
            }}
          ></input>
          <button
            className="searchButton"
            onClick={() => {
              updateSearch(search);
              navigate("/");
            }}
          >
            Search
          </button>
          <Link to="/">
            <li
              onClick={() => {
                updateSearch("");
                navigate("/");
              }}
            >
              <FontAwesomeIcon icon={faHouseChimney} />
            </li>
          </Link>
          <Link to="/cart">
            <li>
              <FontAwesomeIcon icon={faCartShopping} />
            </li>
          </Link>
          <Link to="/checkout">
            <li>
              <FontAwesomeIcon icon={faCashRegister} />
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
