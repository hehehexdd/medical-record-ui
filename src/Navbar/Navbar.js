import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);

  useEffect(() => {
    window.addEventListener('storage', () => {
     const loggedIn = JSON.parse(localStorage.getItem('loggedIn'))
       if(loggedIn) {
        setIsLoggedIn(true)
       }
    })
   })


  const handleLogOut = () => {
    setIsLoggedIn(JSON.parse('false'));
    localStorage.clear();
  };

  return (
    <nav>
      <ul>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogOut}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
