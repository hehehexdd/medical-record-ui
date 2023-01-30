// import axios from '../api/axios';
import axios from "axios";

const HomePage = () => {
  const getUser = async () => {
    const token = localStorage.getItem("jwtToken");
    const userId = localStorage.getItem("userId");
    const roleEndpoint = localStorage.getItem("role").toLowerCase();

    try {
      const response = await axios.get(
        `http://localhost:8080/${roleEndpoint}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  getUser();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="welcome-text">Welcome to our website!</h1>
      </header>
      <img
        className="home-image"
        src="https://via.placeholder.com/1200x600"
        alt="hospital"
      />
    </div>
  );
};

export default HomePage;
