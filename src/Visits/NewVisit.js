import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const NewVisit = () => {
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [gpLabel, setGpLabel] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState(null);
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
        setAvailableDoctors(doctors);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleGp = (value) => {
    setDoctor(value.split(":")[0]);
    setGpLabel(value.split(":")[1]);
  };

  const handleChange = (date) => {
    setDate(date);
  };

  const handleCancel = () => {
    history("/myVisits");
  };

  const handleSubmit = (event) => {
    const name = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("jwtToken");
    const payload = {
      doctor: {
        userId: doctor,
        name: gpLabel,
      },
      patient: {
        name: name,
        userId: userId,
      },
      date: date,
    };
    createVisit(payload, token);
    history("/myVisits");
  };

  const createVisit = async (payload, token) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/visits`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Appointment created!");
    } catch (err) {
      if (err?.response) {
        alert(err.response.data.message);
      } else {
        alert("An error occured please try again later!");
      }
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Doctor</Form.Label>
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-gp">
            {gpLabel || "Select Doctor"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {availableDoctors.map((option) => (
              <Dropdown.Item
                onClick={() => handleGp(option)}
                key={option.split(":")[0]}
              >
                {option.split(":")[1]}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Date</Form.Label>
        <DatePicker
          showTimeSelect
          selected={date}
          onChange={handleChange}
          className="form-control"
          minDate={new Date()}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
        Submit
      </Button>
      <Button variant="error" type="button" onClick={handleCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default NewVisit;
