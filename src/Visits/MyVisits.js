import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyVisits = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const history = useNavigate();

  
  const fetchVisits = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("jwtToken");

    try {
      axios
        .get(`http://localhost:8080/visits?patient.userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setData(res.data);
          return res.data;
        });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDoctors = () => {
    axios
      .get("http://localhost:8080/doctor", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const doctors = [];
        res.data.forEach((doctor) => {
          const d = {
            name: doctor.name,
            id: doctor.id,
          };
          doctors.push(d);
        });
        setAvailableDoctors(doctors);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    fetchVisits();
    fetchDoctors();
  }, []);

  const taxes =
    localStorage.getItem("health") &&
    new Date(localStorage.getItem("health")) >= new Date(Date.now())
      ? localStorage.getItem("health").split("T")[0]
      : "HEALTH TAXES NOT PAID!";
  if (taxes === "HEALTH TAXES NOT PAID!") {
    console.log(taxes)
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
            <Card.Title>RESTRICTED</Card.Title>
            <Card.Text>
              Health Taxes Paid until: {taxes}
              <br />
              Please navigate to 'PROFILE' and pay you taxes!
              <br />
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
  const handleNew = () => {
    history("/newVisit");
  };

  const handleClose = () => {
    setShowModal(false);
  };
  
  return (
    <>
      <Button onClick={handleNew}>New Visit</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Diagnosis</th>
            <th>Doctor</th>
            <th>Medicaments</th>
            <th>SickLeave</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.diagnosis}</td>
              <td>{item.doctor.name}</td>
              <td>{JSON.stringify(item.medicaments)}</td>
              <td>{JSON.stringify(item.sickLeave)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Record</h2>
            <p>Form to edit the record goes here...</p>
            <Button onClick={handleClose}>Close</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default MyVisits;
