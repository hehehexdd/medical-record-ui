// import axios from "api/axios";
// import React, { useEffect, useState } from "react";
// // import "./Profile.css";

// function ProfilePage() {
//   const [name, setName] = useState("");
//   const [visits, setVisits] = useState("");
//   const [totalPatients, setTotalPatients] = useState("");
//   const [moreSpecialiteis, setMoreSpecialities] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     const token = localStorage.getItem("jwtToken");
//     if (localStorage.getItem("role").toLowerCase() === "doctor") {
//       getUser();
//       axios
//         .get(`http://localhost:8080/visits?doctor.userId=${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((res) => {
//           const totalVisits = res?.data;
//           setVisits(totalVisits.length);
//         })
//         .catch((err) => {
//           if (err?.response) {
//             alert(err.response.message);
//           }
//         });

//       axios
//         .get(`http://localhost:8080/patient?gp.userId=${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((res) => {
//           const totalPatients = res?.data;
//           setTotalPatients(totalPatients.length);
//         })
//         .catch((err) => {
//           if (err?.response) {
//             alert(err.response.message);
//           }
//         });

//       axios
//         .get(`http://localhost:8080/doctor/specialities`)
//         .then((res) => {
//           const moreSpecialities = res?.data;
//           setMoreSpecialities(moreSpecialities);
//           //setSelectedItems(localStorage.getItem("specialities").split(","));
//         })
//         .catch((err) => {
//           if (err?.response) {
//             alert(err.response.message);
//           }
//         });
//     }
//     if (localStorage.getItem("role").toLowerCase() === "patient") {
//       //pay taxes
//     }
//   }, []);

//   const handleCheckboxChange = (event) => {
//     const { value } = event.target;
//     if (selectedItems.includes(value)) {
//       setSelectedItems(selectedItems.filter((item) => item !== value));
//     } else {
//       setSelectedItems([...selectedItems, value]);
//     }
//   };

//   const handleSubmit = () => {
//     const lenght = selectedItems.length;
//     if (selectedItems.length) {
//       updateSpecialities(selectedItems);
//     }
//     window.location.reload();
//   };

//   const updateSpecialities = (updatedSpecialities) => {
//     const payload = {
//       specialities: updatedSpecialities,
//     };
//     const token = localStorage.getItem("jwtToken");
//     const userId = localStorage.getItem("userId");
//     axios
//       .patch(`http://localhost:8080/doctor/${userId}`, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const getUser = () => {
//     const userId = localStorage.getItem("userId");
//     const token = localStorage.getItem("jwtToken");
//     axios
//       .get(
//         `http://localhost:8080/doctor/${userId}`,
//         //`${process.env.AUTH_URL}/auth/token`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       .then((res) => {
//         localStorage.setItem("specialities", res.data.specialities);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handlePayTaxes = () => {
//     alert("Success");
//   };

//   return (
//     <div>
//       <div>
//         <label htmlFor="name">Name: {localStorage.getItem("userName")}</label>
//         <label />
//       </div>
//       {localStorage.getItem("role").toLowerCase() === "patient" && (
//         <div>
//           <label htmlFor="name">
//             Health Taxes Paid until: {localStorage.getItem("health")}
//           </label>
//           <br/>
//           <button onClick={handlePayTaxes}>Pay Taxes</button>
//         </div>
//       )}
//       {localStorage.getItem("role").toLowerCase() === "doctor" && (
//         <div>
//           <label htmlFor="name">
//             Specialties: {localStorage.getItem("specialities")}
//           </label>
//           <br />
//           <label>Number of patients assigned to you: {totalPatients}</label>
//           <br />
//           <label>Number of visits: {visits}</label>
//           <br />
//           <br />
//           <label>Add more specialties: </label>
//           <div>
//             {moreSpecialiteis.map((option) => (
//               <label key={option}>
//                 <input
//                   type="checkbox"
//                   value={option}
//                   onChange={handleCheckboxChange}
//                 />
//                 {option}
//               </label>
//             ))}
//             <button onClick={handleSubmit}>Submit</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProfilePage;
