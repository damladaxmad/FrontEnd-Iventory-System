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
import NewLayout from "./containers/NewLayout";
import Vendors from "./Pages/Vendors"
import Purchases from "./Pages/Purchases";
import { setIsConnected } from "./redux/actions/isLoginActions";
import { setDashboard } from "./redux/actions/dashboardActions";
import PrintFile from "./Pages/PrintFile";
import useFetch from "./funcrions/DataFetchers";
import { constants } from "./Helpers/constantsFile";

const pages = [
     <Route path= "/dashboard" element = {<Dashboard/>} />,
     <Route path= "/customers" element = {<Customers/>} />,
     <Route path= "/products" element = {<Products/>} />,
     <Route path= "/sales" element = {<Sales/>} />,
     <Route path= "/emplooyees" element = {<Employees/>} />,
     <Route path= "/adminstration" element = {<Adminstration/>} />,    
     <Route path= "/vendors" element = {<Vendors/>} />,    
     <Route path= "/purchases" element = {<Purchases/>} />,    
     <Route path= "/print" element = {<PrintFile/>} />,    
]

function App() {
  
  const isLogin = useSelector(state => state.isLogin.isLogin)
  const isReports = useSelector(state => state.isLogin.isReports)
  const isConnected = useSelector(state => state.isLogin.isConnected)
  const [showLayout, setShowLayout] = useState(isLogin)
  const [showReports, setShowReports] = useState(isReports)
  const dispatch = useDispatch();
  const companyInfo = useSelector(state => state.companyInfo.companyInfo)

  dispatch(setDashboard(useFetch("dashboard", isLogin, "dashboard")))

  const showHandler = () => {
    setShowLayout(true)
  }

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
      {showLayout && !showReports && <NewLayout>
          <Routes>
            {pages.map(page => (
              page
            ))}
          </Routes>
        </NewLayout>}
      </Router>
    </div>
         
  );
}

export default App;
