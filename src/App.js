import { RegisterPage } from "./Register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from "Login/Login";
import Navbar from "Navbar/Navbar";
import HomePage from "Home/HomePage";

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/" element={<HomePage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
