// import { RegisterPage } from "./Register/Register-old";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "Navbar/Navbar";
import LoginPage from "Login/Login";
import HomePage from "Home/HomePage";
import RegisterPage from "Register/Register";
import ProfilePage from "Profile/Profile";
import MyVisits from "Visits/MyVisits";
import NewVisit from "Visits/NewVisit";
import Visits from "Visits/Visits";

function App() {
  return (
    <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="/myVisits" element={<MyVisits/>}/>
      <Route path="/newVisit" element={<NewVisit/>}/>
      <Route path="/visits" element={<Visits/>}/>
      
    </Routes>
  </Router>
  );
}

export default App;
