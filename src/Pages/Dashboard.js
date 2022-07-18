import React, { useEffect } from "react";
import QuickActions from "../containers/DashboardContainers/QuickActions";
import StatCard from "../containers/DashboardContainers/StatCard";
import UpdateStudents from "../containers/DashboardContainers/UpdateStudents";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setDashboard } from "../redux/actions/dashboardActions";
import JsPDF from "jspdf";
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";

const generatePDF = () => {
  const report = new JsPDF("portrait", "pt", "a4");
  report.html(document.getElementById("uni")).then(() => {
    report.save("report.pdf");
  });
};

const Dashboard = () => {
  
  const dashboard = useSelector((state) => state.dashboard.dashboard);

  const dispatch = useDispatch();
  const stats = [
    { value: "$10.89k", lable: "Customers", id: 1 },
    { value: "$5.77k", lable: "Products", id: 2 },
    { value: "$67.98k", lable: "Vendors", id: 3 },
    { value: "$67.98k", lable: "Sales", id: 4 },
    { value: "$67.98k", lable: "Receivable", id: 5 },
    { value: "$67.98k", lable: "Payable", id: 6 },
  ];

  const fetchDashboard = async () => {
    // const response = await axios
    //   .get("/api/v1/dashboard")
    //   .catch((err) => {
    //     console.log("Err: ", err);
    //   });
    dispatch(setDashboard(stats));
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div
      id="uni"
      style={{
        height: "100%",
        width: "95%",
        margin: "0px auto",
        display: "flex",
        gap: "14px",
        flexDirection: "column",
      }}
    >
      <h2> Dashboard</h2>
      <div
        style={{
          display: "flex",
          gap: "12px",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {dashboard.map((d, index) => (
          <StatCard value={d} key={index} />
        ))}
      </div>
 
    </div>
  );
};

export default Dashboard;
