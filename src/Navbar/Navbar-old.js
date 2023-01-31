// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
//   const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);
//   const history = useNavigate();

//   useEffect(() => {
//     window.addEventListener("storage", () => {
//       const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
//       if (loggedIn) {
//         setIsLoggedIn(true);
//       }
//     });
//   });

//   const handleLogOut = () => {
//     setIsLoggedIn(JSON.parse("false"));
//     localStorage.clear();
//     history("/");
//     window.location.reload();
//   };

//   const handleProfile = () => {
//     history("/profile");
//   };

//   const handleHome = () => {
//     history("/");
//   };

//   return (
//     <nav>
//       <ul>
//         {isLoggedIn ? (
//           <>
//             <li>
//               <button onClick={handleHome}>Home</button>
//             </li>
//             <li>
//               <button onClick={handleProfile}>Profile</button>
//               {/* <Link to="/profile">Profile</Link> */}
//             </li>
//             <li>
//               <button onClick={handleLogOut}>Logout</button>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/login">Login</Link>
//             </li>
//             <li>
//               <Link to="/register">Register</Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
