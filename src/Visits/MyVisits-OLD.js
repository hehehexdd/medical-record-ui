// import {
//   ColumnDirective,
//   ColumnsDirective,
//   CommandColumn,
//   Edit,
//   Filter,
//   GridComponent,
//   Group,
//   Inject,
//   Page,
//   Sort,
// } from "@syncfusion/ej2-react-grids";
// import axios from "api/axios";
// import { useEffect } from "react";
// // import { data } from "./data";

// const MyVisits = () => {
//   let data = JSON.parse(localStorage.getItem("data"));
//   console.log(data);

//   useEffect(() => {
//     fetchVisits();
//     //data = JSON.parse(localStorage.getItem('data'));
//   }, []);

//   const editSettings = {
//     allowEditing: true,
//     allowAdding: true,
//     allowDeleting: true,
//     allowEditOnDblClick: false,
//   };
//   const editparams = { params: { popupHeight: "300px" } };
//   const validationRule = { required: true };
//   const commands = [
//     {
//       title: "Edit",
//       type: "Edit",
//       buttonOption: { iconCss: " e-icons e-edit", cssClass: "e-flat" },
//     },
//     {
//       title: "Delete",
//       type: "Delete",
//       buttonOption: { iconCss: "e-icons e-delete", cssClass: "e-flat" },
//     },
//     {
//       title: "Save",
//       type: "Save",
//       buttonOption: { iconCss: "e-icons e-update", cssClass: "e-flat" },
//     },
//     {
//       title: "Cancel",
//       type: "Cancel",
//       buttonOption: { iconCss: "e-icons e-cancel-icon", cssClass: "e-flat" },
//     },
//   ];
//   const pageSettings = { pageSize: 6 };
//   return (
//     <GridComponent
//       dataSource={data}
//       allowPaging={true}
//       pageSettings={pageSettings}
//     >
//       <ColumnsDirective>
//         <ColumnDirective
//           headerText="Manage Records"
//           width="160"
//           commands={commands}
//         ></ColumnDirective>

//         <ColumnDirective field="id" width="100" textAlign="Right" />
//         {/* <ColumnDirective field="patient" width="100" /> */}
//         {/* <ColumnDirective field="doctor" width="100" textAlign="Right" /> */}
//         <ColumnDirective field="date" width="100" textAlign="Right" />
//         <ColumnDirective field="diagnosis" width="100" textAlign="Right" />
//         {/* <ColumnDirective field="medicaments" width="100" textAlign="Right" /> */}
//         {/* <ColumnDirective field="sickLeave" width="100" textAlign="Right" /> */}
//       </ColumnsDirective>
//       <Inject services={[Page, Sort, Filter, Group]} />
//     </GridComponent>
//   );

//   //     return (<div className='control-pane'>
//   //     <div className='control-section'>
//   //       <GridComponent id='gridcomp' dataSource={{}} allowPaging={true} pageSettings={{ pageCount: 5 }} editSettings={editSettings}>
//   //         <ColumnsDirective>
//   //           <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' isPrimaryKey={true} validationRules={validationRule}></ColumnDirective>
//   //           <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={validationRule}></ColumnDirective>
//   //           <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' editType='numericedit'></ColumnDirective>
//   //           <ColumnDirective field='OrderDate' headerText='Order Date' editType='datepickeredit' format='yMd' width='170'></ColumnDirective>
//   //           <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit' edit={editparams}></ColumnDirective>
//   //           <ColumnDirective headerText='Manage Records' width='160'
//   //           commands={commands}></ColumnDirective>
//   //         </ColumnsDirective>
//   //         </ColumnsDirective>
//   //         <Inject services={[Page, CommandColumn, Edit]}/>
//   //       </GridComponent>
//   //     </div>
//   //   </div>);
// };
// export default MyVisits;

// const fetchVisits = async () => {
//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("jwtToken");

//   try {
//     axios
//       .get("http://localhost:8080/visits?patient.userId=idPatient", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         localStorage.setItem("data", JSON.stringify(res.data));
//         return res.data;
//       });
//   } catch (err) {
//     console.log(err);
//   }
// };
