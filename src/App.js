import React, {useState,useEffect} from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Customers from "./Pages/Customers";
import Layout from "./containers/layout";
import Adminstration from "./Pages/Adminstration";
import { useDispatch } from "react-redux";
import axios from "axios";
import SignupAndLogin from "./SignupAndLogin/SignupAndLogin";
import "./App.css"
import Employees from "./Pages/Employees";
import { useSelector } from "react-redux";
import Sales from "./Pages/Sales";
import { setCustomers } from "./redux/actions/customersActions";
import Products from "./Pages/Products";
import { setCompanyInfo } from "./redux/actions/companyInfoActions";

const pages = [
<Route path= "/dashboard" element = {<Dashboard/>} />,
<Route path= "/customers" element = {<Customers/>} />,
<Route path= "/products" element = {<Products/>} />,
     <Route path= "/classes" element = {<Sales/>} />,
     <Route path= "/emplooyees" element = {<Employees/>} />,
     <Route path= "/adminstration" element = {<Adminstration/>} />,
     
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

  const fetchCompanyInfo = async () => {
    const res = await axios.get('api/v1/companyInfo')
    dispatch(setCompanyInfo(res.data.data))
  }

  const showHandler = () => {
    setShowLayout(true)
  }

  

  useEffect(() => {
    fetchCustomers()
    fetchCompanyInfo()
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
