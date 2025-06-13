import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-white shadow-sm py-3 px-4 d-flex justify-content-between align-items-center border-bottom">
    <h1 className="h4 text-dark m-0">Health Care</h1>
    <nav className="d-flex gap-3">
      <Link to="/" className="text-decoration-none text-dark">Home</Link>
      <Link to="/login" className="text-decoration-none text-dark">Login</Link>
      <Link to="/register" className="text-decoration-none text-dark">Register</Link>
    </nav>
  </header>
);

export default Header;
