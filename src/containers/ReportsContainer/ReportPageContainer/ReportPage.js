import React from "react"
import ReportHeader from "./ReportHeader";
import ReportsTable from "./ReportsTable";
import { Divider } from "@mui/material";
import ReportFooter from "./ReportFooter";

const ReportPage = () => {
   
    return (
        
        <div style={{width: "100%", padding: "10px",
        background: "#F7F7F7", display: "flex", flexDirection: "column",
        alignItems: "center", gap:"20px"}}>

            <ReportHeader/>
            <ReportsTable/>
            <Divider style = {{marginTop: "0px", width: "70%",
            marginBottom: "20px", margin: "auto", color: "#B9B9B9"}}/>
            <ReportFooter/> 

        </div>
    )

}

export default ReportPage