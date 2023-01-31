import axios from "api/axios";
import React, { useEffect, useState } from "react";
// import "./Register.css";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [ucn, setUCN] = useState("");
  const [npi, setNPI] = useState("");
  const [gp, setGp] = useState("");
  const [specialities, setSpecialities] = useState([]);
  const [mainSpecialty, setMainSpecialty] = useState("");
  const [availableGPs, setAvailableGPs] = useState([]);

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

  const handleRoleChange = (event) => {
    setRole(event.target.value);
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

  const handleSpeciality = (value) => {
    console.log(value)
    setMainSpecialty(value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (password != confirmPassword) {
      alert("Passwords must match!");
    } else {
      userRegister(username, password, name, role, ucn, npi, gp, mainSpecialty);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        required
        onChange={(event) => setUsername(event.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        required
        onChange={(event) => setPassword(event.target.value)}
      />
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        required
        onChange={(event) => setConfirmPassword(event.target.value)}
      />
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        required
        onChange={(event) => setName(event.target.value)}
      />
      <label htmlFor="role">Role:</label>
      <select
        id="role"
        value={role}
        required
        onChange={(event) => handleRoleChange(event)}
      >
        <option value="">Select Role</option>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>
      {role === "patient" && (
        <div>
          <label htmlFor="ucn">UCN:</label>
          <input
            type="text"
            id="ucn"
            value={ucn}
            onChange={(e) => handleUcn(e)}
          />
          <label htmlFor="gp">Gp:</label>
          <select
            required
            id="gp"
            value={gp}
            onChange={(e) => setGp(e.target.value)}
          >
            <option value="">Select GP</option>
            {availableGPs.map((option) => (
              <option
                key={option.split(":")[2] + " " + option.split(":")[1]}
                value={option.split(":")[0]}
              >
                {option.split(":")[1]}
              </option>
            ))}
          </select>
        </div>
      )}
      {role === "doctor" && (
        <div>
          <label htmlFor="npi">NPI:</label>
          <input
            type="text"
            id="npi"
            value={npi}
            required
            onChange={(e) => handleNpi(e)}
          />
          <label htmlFor="specialities">Main Specialty:</label>
          <select
            required
            id="specialities"
            value={mainSpecialty}
            onChange={(e) => setMainSpecialty(e.target.value)}
          >
            <option value="">Select Specialties</option>
            {specialities.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
      <br />
      <button type="submit">Register</button>
    </form>
  );
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
    const response = await axios.post(`http://localhost:8080/${role}`, payload);

    console.log("REGISTERED: ", response.data);
  } catch (err) {
    console.log(err?.response);
  }
};
