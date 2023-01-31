// import {
//   GridComponent,
//   ColumnsDirective,
//   ColumnDirective,
//   Inject,
//   Page,
//   Edit,
//   Toolbar,
// } from "@syncfusion/ej2-react-grids";
// import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const MyVisits = () => {
//   const [availableDoctors, setAvailableDoctors] = useState([]);
//   const [data, setData] = useState([]);

// //   let data = JSON.parse(localStorage.getItem("data"));
  
//   useEffect(() => {
//     fetchVisits();
//     fetchDoctors();
//     // data = JSON.parse(localStorage.getItem("data"));
//   }, []);

//   const fetchVisits = async () => {
//     const userId = localStorage.getItem("userId");
//     const token = localStorage.getItem("jwtToken");

//     try {
//       axios
//         .get("http://localhost:8080/visits?patient.userId=idPatient", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((res) => {
//             setData(res.data);
//         //   localStorage.setItem("data", JSON.stringify(res.data));
//           return res.data;
//         });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const fetchDoctors = () => {
//     axios
//       .get("http://localhost:8080/doctor", {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((res) => {
//         const doctors = [];
//         res.data.forEach((doctor) => {
//           const d = {
//             name: doctor.name,
//             id: doctor.id,
//           };
//           doctors.push(d);
//         });
//         setAvailableDoctors(doctors);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   console.log(data)
//   console.log(availableDoctors)
//   const toolbarOptions = ["Add", "Update", "Cancel"];
//   const editSettings = {
//     allowEditing: true,
//     allowAdding: true,
//     allowDeleting: false,
//     newRowPosition: "Top",
//   };
// //   const editparams = { params: { popupHeight: "300px" } };
//   const validationRule = { required: true };
// //   const orderidRules = { required: false };
//   const pageSettings = { pageCount: 10 };
//   const format = { type: "dateTime", format: "M/d/y hh:mm a" };
//   let gridInstance;
//   let dropDownInstance;

//   function actionBegin(args) {
//     if (args.requestType === "save") {
//         if (
//           gridInstance.pageSettings.currentPage !== 1 &&
//           gridInstance.editSettings.newRowPosition === "Top"
//         ) {
//           args.index =
//             gridInstance.pageSettings.currentPage *
//               gridInstance.pageSettings.pageSize -
//             gridInstance.pageSettings.pageSize;
//         } else if (gridInstance.editSettings.newRowPosition === "Bottom") {
//           args.index =
//             gridInstance.pageSettings.currentPage *
//               gridInstance.pageSettings.pageSize -
//             1;
//         }
//     }
//   }
//     // function ddChange() {
//     //   gridInstance.editSettings.newRowPosition = dropDownInstance.value;
//     // }
//   return (
//     <div className="control-pane">
//       <div className="control-section">
//         <div className="col-md-9">
//           <GridComponent
//             dataSource={data}
//             ref={(grid) => (gridInstance = grid)}
//             toolbar={toolbarOptions}
//             allowPaging={true}
//             editSettings={editSettings}
//             pageSettings={pageSettings}
//             actionBegin={actionBegin.bind(this)}
//           >
//             <ColumnsDirective>
//               <ColumnDirective
//                 field="id"
//                 headerText="ID"
//                 width="140"
//                 textAlign="Right"
//                 allowEditing={false}
//                 // isPrimaryKey={true}
//               ></ColumnDirective>
//               <ColumnDirective
//                 field="date"
//                 headerText="Date of Visit"
//                 width="150"
//                 format={format}
//                 editType="datetimepickeredit"
//                 validationRules={validationRule}
//               ></ColumnDirective>
//               <ColumnDirective
//                 field="diagnosis"
//                 headerText="Diagnosis"
//                 width="140"
//                 format="C2"
//                 textAlign="Right"
//                 allowEditing={false}
//                 editType="numericedit"
//               ></ColumnDirective>
//               <ColumnDirective
//                 field="doctor.name"
//                 headerText="Doctor"
//                 width="140"
//                 format="C2"
//                 textAlign="Right"
//                 allowEditing={true}
//                 validationRules={validationRule}
//                 editType="dropDownEdit"
//                 editTemplate={(props) => (
//                   <DropDownListComponent
//                     dataSource={availableDoctors}
//                     fields={{ text: "name", value: "id" }}
//                     value={props.value}
//                   />
//                 )}
//               ></ColumnDirective>
//               {/* <ColumnDirective
//                 field="OrderDate"
//                 headerText="Order Date"
//                 editType="datetimepickeredit"
//                 format={format}
//                 width="160"
//               ></ColumnDirective> */}
//               {/* <ColumnDirective
//                 field="ShipCountry"
//                 headerText="Ship Country"
//                 width="150"
//                 editType="dropdownedit"
//                 // edit={editparams}
//               ></ColumnDirective> */}
//             </ColumnsDirective>
//             <Inject services={[Page, Toolbar, Edit]} />
//           </GridComponent>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default MyVisits;
