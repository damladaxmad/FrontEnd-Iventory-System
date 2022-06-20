import React, { useState } from "react";
import Header from "../containers/ReportsContainer/Header";
import ReportPage from "../containers/ReportsContainer/ReportPageContainer/ReportPage";
import Ribbon from "../containers/ReportsContainer/Ribbon";

const Users = () => {
  
  return (
    <div
    style={{
      height: "100%",
      width: "100%",
      margin: "0px auto",
      display: "flex",
      flexDirection: "column",
      alignItems:"center"
    }}
  >
   
    <Header/>
    <Ribbon/>
    <ReportPage/>

    </div>
  );
};

export default Users;
