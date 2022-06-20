import React, {useState,useEffect} from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Customers from "./Pages/Students";
import Layout from "./containers/layout";
import Adminstration from "./Pages/Adminstration";
import SettingsPage from "./Pages/SettingsPage";
import { useDispatch } from "react-redux";
import axios from "axios";
import SignupAndLogin from "./SignupAndLogin/SignupAndLogin";
import "./App.css"
import Employees from "./Pages/Employees";
import Reports from "./Pages/Reports";
import { useSelector } from "react-redux";
import Sales from "./Pages/Sales";
import { setCustomers } from "./redux/actions/customersActions";
import Products from "./Pages/Products";

const pages = [
<Route path= "/dashboard" element = {<Dashboard/>} />,
<Route path= "/students" element = {<Customers/>} />,
<Route path= "/teachers" element = {<Products/>} />,
     <Route path= "/classes" element = {<Sales/>} />,
     <Route path= "/emplooyees" element = {<Employees/>} />,
     <Route path= "/adminstration" element = {<Adminstration/>} />,
     <Route path= "/settings" element = {<SettingsPage/>} />,
     
]

function App() {

  const isLogin = useSelector(state => state.isLogin.isLogin)
  const isReports = useSelector(state => state.isLogin.isReports)
  const [showLayout, setShowLayout] = useState(isLogin)
  const [showReports, setShowReports] = useState(isReports)
  const dispatch = useDispatch();

  const fetchCustomers = async () => {
    const response = await axios
      .get("/api/v1/customers")
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(setCustomers(response.data.data.customers));
  };

  const showHandler = () => {
    setShowLayout(true)
  }


  useEffect(() => {
    fetchCustomers()
  }, []);

  useEffect(()=> {
    setShowLayout(isLogin)
    setShowReports(isReports)
  }, [isLogin, isReports])

  return (
    

   <div className="App" style={{backgroundColor: "#F0F2FA", display: "flex",
   justifyContent: "center",}}>
      <Router>
    {!showLayout && 
    <Route path= "/signup" element = {<SignupAndLogin
    showHandler = {showHandler}/>} />}
   {showReports && <Route path= "/reports" element = {<Reports />} />}
      {showLayout && !showReports && <Layout>
          <Routes>
            {pages.map(page => (
              page
            ))}
          </Routes>
        </Layout>}
      </Router>
    </div>
         
  );
}

export default App;
