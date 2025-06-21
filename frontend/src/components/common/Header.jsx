import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, clearToken } from '../../utils/tokenHelper';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, []);

  const handleLogout = () => {
    clearToken();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm py-3 px-4 d-flex justify-content-between align-items-center border-bottom">
      <h1 className="h4 text-dark m-0">Health Care</h1>
      <nav className="d-flex gap-3 align-items-center">
        <Link to="/" className="text-decoration-none text-dark">Home</Link>
        {isLoggedIn ? (
          <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login" className="text-decoration-none text-dark">Login</Link>
            <Link to="/register" className="text-decoration-none text-dark">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
