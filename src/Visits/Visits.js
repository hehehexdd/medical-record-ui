import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";

const Visits = () => {
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [gpLabel, setGpLabel] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState(null);
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);

  const fetchVisits = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("jwtToken");

    try {
      axios
        .get(`http://localhost:8080/visits?doctor.userId=${userId}`, {
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

  useEffect(() => {
    fetchVisits();
  }, []);

  function EditModal({ item }) {
    const [diagnosis, setDiagnosis] = useState("");
    const [medicament, setMedicament] = useState("");
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [show, setShow] = useState(false);
    const itemId = item.id;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = () => {
      console.log(itemId);
      if (!diagnosis) alert("Diagnosis is required!");
      else if (medicament && !medicament.match(/\w+-\w+;/))
        alert(
          "Enter the medicaments separated by ';' with no spaces & dosage with '-'!"
        );
      else {
        let medicaments = [];
        if (medicament) {
          medicament.split(";").forEach((med) => {
            const meds = {
              medicamentName: med.split("-")[0],
              dosage: med.split("-")[1],
            };
            medicaments.push(meds);
          });
        }
        console.log(medicaments)
        const token = localStorage.getItem("jwtToken");
        const payload = {
          diagnosis: diagnosis,
        };
        if (medicaments.length) payload.medicaments = medicaments;
        if (selectedStartDate) {
            payload.sickLeave = {};
          payload.sickLeave.startDate = selectedStartDate.toISOString();
          selectedEndDate != null
            ? (payload.sickLeave.endDate = selectedEndDate.toISOString())
            : payload.sickLeave.endDate = selectedStartDate.toISOString();

            const days = (new Date(selectedEndDate).getTime() - new Date(selectedStartDate).getTime())/(1000*60*60*24);
            payload.sickLeave.numberOfDays = days;
        }
        console.log(payload)
        updateVisit(itemId, payload, token);
      }
    };

    const updateVisit = async (visitId, payload, token) => {
        console.log(visitId)
      try {
        const response = await axios.patch(
          `http://localhost:8080/visits/${visitId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Visit updated!");
      } catch (err) {
        if (err?.response) {
          alert(err.response.data.message);
        } else {
          alert("An error occured please try again later!");
        }
      }
    };

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Edit
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Record</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="justify-content-md-center">
              <Form className="p-3 border" onSubmit={handleSubmit}>
                <Form.Label>Describe the diagnosis</Form.Label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    value={diagnosis}
                    required
                    onChange={(e) => setDiagnosis(e.target.value)}
                  />
                  {""}
                </Form.Group>
                <Form.Label>Describe the medicament</Form.Label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    value={medicament}
                    onChange={(e) => setMedicament(e.target.value)}
                  />
                  {""}
                </Form.Group>
              </Form>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col} md="6">
                <Form.Label>Sick leave from</Form.Label>
                <DatePicker
                  selected={selectedStartDate}
                  onChange={(date) => setSelectedStartDate(date)}
                  className="form-control"
                  minDate={new Date()}
                />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col} md="6">
                <Form.Label>Sick leave until</Form.Label>
                <DatePicker
                  selected={selectedEndDate}
                  onChange={(date) => setSelectedEndDate(date)}
                  className="form-control"
                  minDate={new Date(selectedStartDate)}
                />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Patient</th>
          <th>Diagnosis</th>
          <th>Medicament</th>
          <th>Sick Leave</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.date}</td>
            <td>{item.patient.name}</td>
            <td>{item.diagnosis}</td>
            <td>{JSON.stringify(item.medicaments)}</td>
            <td>{JSON.stringify(item.sickLeave)}</td>
            <td>
              <EditModal item={item} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Visits;
