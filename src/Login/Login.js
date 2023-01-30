import axios from "api/axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/token",
       //`${process.env.AUTH_URL}/auth/token`,
        JSON.stringify({
          username,
          password,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const accessToken = response?.data?.jwtToken;
      const role = response?.data?.role;
      const userId = response?.data?.userId;
      localStorage.setItem('jwtToken', accessToken);
      localStorage.setItem('role', role);
      localStorage.setItem('userId', userId);
      localStorage.setItem('loggedIn', 'true');
      history('/');
      window.location.reload();

    } catch (err) {
      if (err?.response) {
        alert(`Login failed: ${err.response.data.message}`);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" >Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
