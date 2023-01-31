import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/token",
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
      localStorage.setItem("jwtToken", accessToken);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      localStorage.setItem("loggedIn", "true");
      await getUser();
      history("/");
      window.location.reload();
    } catch (err) {
      if (err?.response) {
        alert(`Login failed: ${err.response.data.message}`);
      }
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/${localStorage
          .getItem("role")
          .toLowerCase()}/${localStorage.getItem("userId")}`,
        //`${process.env.AUTH_URL}/auth/token`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const user = response?.data;
      console.log(user);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("ucn", user.ucn);
      localStorage.setItem("npi", user.npi);
      localStorage.setItem("specialities", user.specialities);
      localStorage.setItem("health", user.healthTaxesPaidUntil);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};

export default LoginPage;
