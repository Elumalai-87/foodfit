import React from "react";
import logo1 from "../assets/logo1.png";
import userIcon from "../assets/user.png";
import cartIcon from "../assets/cart.png";

const NavBar = () => (
  <nav className="navbar">
    {/* Top row: logo + nav links + icons */}
    <div className="nav-logo">
      <img src={logo1} alt="Juice Logo" />
    </div>
    <div className="nav-top">
      <div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#menu">Menu</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-search">
          <input type="text" placeholder="Search a product" />
          <button>🔍</button>
        </div>
      </div>
    </div>

    {/* Search bar below */}

    <div className="nav-icons">
      <img src={userIcon} alt="User" className="icon" />
      <img src={cartIcon} alt="Cart" className="icon" />
    </div>
  </nav>
);

export default NavBar;
