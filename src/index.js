import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
// import { RegisterPage } from "./Register/Register-old";
import App from "./App";
import { AuthProvider } from "./Context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@syncfusion/ej2-base/styles/material.css';  
import '../node_modules/@syncfusion/ej2-buttons/styles/material.css';  
import '../node_modules/@syncfusion/ej2-calendars/styles/material.css';  
import '../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';  
import '../node_modules/@syncfusion/ej2-inputs/styles/material.css';  
import '../node_modules/@syncfusion/ej2-navigations/styles/material.css';
import '../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
import '../node_modules/@syncfusion/ej2-notifications/styles/material.css';
import "../node_modules/@syncfusion/ej2-react-grids/styles/material.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
