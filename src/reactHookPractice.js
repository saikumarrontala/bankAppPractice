import React from "react";

const Navbar = ({ isLogedIn }) => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="logo" alt="logo" />
        </div>
        <div>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          {isLogedIn ? (
            <a href="/Profile">Profile</a>
          ) : (
            <a href="signin">signin</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;