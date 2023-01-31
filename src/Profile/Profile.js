import axios from "api/axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Dropdown,
  Form,
  InputGroup,
} from "react-bootstrap";

function ProfilePage() {
  const [name, setName] = useState("");
  const [visits, setVisits] = useState("");
  const [totalPatients, setTotalPatients] = useState("");
  const [moreSpecialiteis, setMoreSpecialities] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const taxes =
    localStorage.getItem("health") &&
    new Date(localStorage.getItem("health")) >= new Date(Date.now())
      ? localStorage.getItem("health").split('T')[0]
      : "HEALTH TAXES NOT PAID!";

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("jwtToken");
    if (localStorage.getItem("role").toLowerCase() === "doctor") {
      getUser();
      axios
        .get(`http://localhost:8080/visits?doctor.userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const totalVisits = res?.data;
          setVisits(totalVisits.length);
        })
        .catch((err) => {
          if (err?.response) {
            alert(err.response.message);
          }
        });

      axios
        .get(`http://localhost:8080/patient?gp.userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const totalPatients = res?.data;
          setTotalPatients(totalPatients.length);
        })
        .catch((err) => {
          if (err?.response) {
            alert(err.response.message);
          }
        });

      axios
        .get(`http://localhost:8080/doctor/specialities`)
        .then((res) => {
          const moreSpecialities = res?.data;
          setMoreSpecialities(moreSpecialities);
        })
        .catch((err) => {
          if (err?.response) {
            alert(err.response.message);
          }
        });
    }
    if (localStorage.getItem("role").toLowerCase() === "patient") {
      //pay taxes
    }
  }, []);

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter((item) => item !== value));
    } else {
      setSelectedItems([...selectedItems, value]);
    }
  };

  const handleSubmit = () => {
    const lenght = selectedItems.length;
    if (selectedItems.length) {
      updateSpecialities(selectedItems);
    }
    window.location.reload();
  };

  const updateSpecialities = (updatedSpecialities) => {
    const payload = {
      specialities: updatedSpecialities,
    };
    const token = localStorage.getItem("jwtToken");
    const userId = localStorage.getItem("userId");
    axios
      .patch(`http://localhost:8080/doctor/${userId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUser = () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("jwtToken");
    axios
      .get(
        `http://localhost:8080/doctor/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data)
        localStorage.setItem("specialities", res.data.specialities);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePayTaxes = () => {
    const inputDate = prompt("Enter the date in format yyyy-mm-dd");
    if (inputDate) {
      const token = localStorage.getItem("jwtToken");
      const userId = localStorage.getItem("userId");
      const payload = {
        healthTaxesPaidUntil: inputDate,
      };
      axios
        .patch(`http://localhost:8080/patient/${userId}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => {
            localStorage.setItem("health", res.data.healthTaxesPaidUntil);
        })
        .catch((err) => {
          if (err?.response) {
            alert(err.response.data);
          } else {
            alert("Something went wrong please try again later!");
          }
        });
      alert("Success");
      window.location.reload();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: "40rem", height: "25rem" }}>
        <Card.Body>
          <Card.Title>
            Name: {localStorage.getItem("userName")} (
            {localStorage.getItem("role")})
          </Card.Title>
          {localStorage.getItem("role").toLowerCase() === "patient" && (
            <Card.Text>
              &#9642; Health Taxes Paid until: {taxes}
              <br />
            </Card.Text>
          )}
          {localStorage.getItem("role").toLowerCase() === "doctor" && (
            <Card.Text>
              &#9642; Specialties: {localStorage.getItem("specialities")}
              <br />
              <br />
              &#9642; Number of patients assigned to you: {totalPatients}
              <br />
              &#9642; Number of visits you helped with: {visits}
              <br />
              <br />
              &#9642; Select more specialties:
              <br />
              <Dropdown>
                <Dropdown.Toggle
                  variant="dark"
                  id="dropdown-mainSpecialty"
                ></Dropdown.Toggle>
                <Dropdown.Menu aria-setsize={5} overflow-y>
                  {moreSpecialiteis.map((option) => (
                    <InputGroup className="mb-1">
                      <InputGroup.Checkbox
                        value={option}
                        onChange={handleCheckboxChange}
                      />
                      {option}
                    </InputGroup>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Card.Text>
          )}
          {localStorage.getItem("role").toLowerCase() === "doctor" && (
            <Button variant="primary" onClick={handleSubmit}>
              Add
            </Button>
          )}
          {localStorage.getItem("role").toLowerCase() === "patient" && (
            <Button variant="primary" onClick={handlePayTaxes}>
              Pay Taxes
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProfilePage;
