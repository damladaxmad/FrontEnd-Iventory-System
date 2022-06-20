import React from "react"
import jaabirLogo from "../../../assets/images/jaabirLogo.jpg";
import { Avatar } from "@mui/material";

const ReportHeader = () => {

    return (
        <div style={{marginTop: "20px", display: "flex",
            flexDirection: "column", alignItems: "center",
            gap: "8px"}}>
            <Avatar sx={{ width: 130, height: 130 }}
            style={{ backgroundColor: "white", color: "orange" }}>
              <img
                src={jaabirLogo}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
              </Avatar>
              <p style={{margin: "0px", fontWeight: "700",
                fontSize:"25px"}}> Student Statement</p>
              <p style={{margin: "0px",
                fontSize:"20px", opacity: 0.7}}> Damlad Axmad Dasar </p>
                <div style={{display: "flex",
                flexDirection: "row", gap: "10px",}}>
                    <p style={{margin: "0px", fontSize:"20px"}}> 03-03-2022</p>
                    <p style={{margin: "0px", fontWeight: "bolder",
                    fontSize:"20px"}}> to</p>
                    <p style={{margin: "0px", fontSize:"20px"}}> 03-03-2022</p>
                </div>
            </div>

    )
}

export default ReportHeader