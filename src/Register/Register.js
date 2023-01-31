import axios from "axios";
import HomePage from "Home/HomePage";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [ucn, setUCN] = useState("");
  const [npi, setNPI] = useState("");
  const [gp, setGp] = useState("");
  const [gpLabel, setGpLabel] = useState("");
  const [specialities, setSpecialities] = useState([]);
  const [mainSpecialty, setMainSpecialty] = useState("");
  const [availableGPs, setAvailableGPs] = useState([]);

  const history = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/doctor", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const doctors = [];
        res.data.forEach((doctor) => {
          doctors.push(doctor.id + ":" + doctor.name + ":" + doctor.npi);
        });
        setAvailableGPs(doctors);
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .get("http://localhost:8080/doctor/specialities", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const specialties = [];
        res.data.forEach((specialty) => {
          specialties.push(specialty);
        });
        setSpecialities(specialties);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleRoleChange = (value) => {
    setRole(value);
  };

  const handleUcn = (event) => {
    const newValue = event.target.value;
    if (/^\d*$/.test(newValue)) {
      setUCN(newValue);
    } else {
      alert("UCN can only contain numbers!");
    }
  };

  const handleNpi = (event) => {
    const newValue = event.target.value;
    if (/^\d*$/.test(newValue)) {
      setNPI(newValue);
    } else {
      alert("NPI can only contain numbers!");
    }
  };

  const handleGp = (value) => {
    setGp(value.split(":")[0]);
    setGpLabel(value.split(":")[1]);
  };

  const handleSpeciality = (value) => {
    console.log(value);
    setMainSpecialty(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password != confirmPassword) {
      alert("Passwords must match!");
    } else {
      userRegister(username, password, name, role, ucn, npi, gp, mainSpecialty);
      history('/');
    }
  };

  const userRegister = async (
    username,
    password,
    name,
    role,
    ucn,
    npi,
    gp,
    specialities
  ) => {
    const roleType = role.toLowerCase();
    console.log(roleType)
    const payload = {
      username,
      password,
      name,
    };
    if (roleType === "patient") {
      payload["ucn"] = ucn;
      payload["gp"] = {
        userId: gp,
      };
    }
    if (roleType === "doctor") {
      payload["npi"] = npi;
      payload.specialty = specialities;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/${roleType}`,
        payload
      );

      alert("REGISTRATION SUCCESSFUL!")
      
    } catch (err) {
        if (err?.response) {
            alert(err.response.data.message);
        }
        else {
            alert("An error occured please try again later!");
        }
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          placeholder="Confirm Password"
        />
      </Form.Group>

      <Dropdown>
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
          {role || "Select an option"}
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark">
          <Dropdown.Item required onClick={() => handleRoleChange("PATIENT")}>
            Patient
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item required onClick={() => handleRoleChange("DOCTOR")}>
            Doctor
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {role === "PATIENT" && (
        <Container fluid>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>UCN</Form.Label>
            <Form.Control
              type="text"
              value={ucn}
              onChange={(e) => handleUcn(e)}
              placeholder="Enter your Unique Civil Number"
            />
          </Form.Group>
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-gp">
              {gpLabel || "Select GP"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {availableGPs.map((option) => (
                <Dropdown.Item
                  onClick={() => handleGp(option)}
                  key={option.split(":")[0]}
                >
                  {option.split(":")[1]}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      )}
      {role === "DOCTOR" && (
        <Container fluid>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>NPI</Form.Label>
            <Form.Control
              type="text"
              value={npi}
              onChange={(e) => handleNpi(e)}
              placeholder="Enter your Unique identification number"
            />
          </Form.Group>
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-mainSpecialty">
              {mainSpecialty || "Select GP"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {specialities.map((option) => (
                <Dropdown.Item
                  onClick={() => handleSpeciality(option)}
                  key={option}
                >
                  {option}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      )}
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};

export default RegisterPage;
