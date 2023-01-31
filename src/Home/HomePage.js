import Carousel from "react-bootstrap/Carousel";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const HomePage = () => {
  const message = localStorage.getItem("loggedIn")
    ? `Welcome back, ${localStorage.getItem("userName")}!`
    : "Your Medical Record!";

  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://thumbs.dreamstime.com/b/nurse-hospital-ward-flat-vector-illustration-health-worker-disabled-patient-cartoon-character-inpatient-treatment-clinic-139875690.jpg"
          alt="Hospital cartoon #1"
        />
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://static.vecteezy.com/system/resources/previews/002/127/142/original/medicine-and-healthcare-concept-illustration-health-examination-patient-consultation-can-use-for-web-homepage-mobile-apps-web-banner-character-cartoon-illustration-flat-style-free-vector.jpg"
          alt="Hospital cartoon #2"
        />

        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://as1.ftcdn.net/v2/jpg/03/10/61/34/1000_F_310613409_bBe2DBeScgbycqwWqPStJK1PREze0u9S.jpg"
          alt="Hospital cartoon #3"
        />

        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
};

export default HomePage;
