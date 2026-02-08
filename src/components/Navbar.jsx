import { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarLoggedIn from './NavbarLoggedIn';
import NavbarLoggedOut from './NavbarLoggedOut';

const API = 'http://localhost:3000';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On load: if we have a token, verify it with the backend (so refresh keeps you logged in)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    axios
      .get(`${API}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => setIsLoggedIn(true))
      .catch(() => localStorage.removeItem('token'));
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <NavbarLoggedIn setLoggedIn={setIsLoggedIn} />
      ) : (
        <NavbarLoggedOut setLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}


export default Navbar;