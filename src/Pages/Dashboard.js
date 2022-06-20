import React, {useEffect} from "react";
import Chart from "../containers/DashboardContainers/Chart";
import QuickActions from "../containers/DashboardContainers/QuickActions";
import StatCard from "../containers/DashboardContainers/StatCard";
import UpdateStudents from "../containers/DashboardContainers/UpdateStudents";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setDashboard } from "../redux/actions/dashboardActions";


const Dashboard = () => {

  const dashboard = useSelector((state) => state.dashboard.dashboard);

  const dispatch = useDispatch();
  const stats = [
    { value: "$10.89k", lable: "salary", id: 1 },
    { value: "$5.77k", lable: "income", id: 2 },
    { value: "$67.98k", lable: "salary", id: 1 },
    { value: "$89.90k", lable: "income", id: 2 },
    { value: "$89.90k", lable: "income", id: 2 },
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
      <div style={{ display: "flex", gap: "12px", width: "100%",
    flexWrap: "wrap", }}>
        {dashboard.map((d, index) => (
          <StatCard value={d} key={index} />
        ))}
      </div>
      <Chart />
      <div style={{ display: "flex", gap: "30px"}}>
      <QuickActions />
     <UpdateStudents/>
      </div>  
      
    </div>
  );
};

export default Dashboard;
