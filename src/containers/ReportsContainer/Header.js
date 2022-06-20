import React, { useState } from "react";
import jaabirLogo from "../../assets/images/jaabirLogo.jpg";
import { Avatar } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setIsReports } from "../../redux/actions/isLoginActions";

const Header = () => {
    const tabs = ["Students", "Examination", "Incomes"]
    const [activeTab, setActiveTab] = useState("Students")
    const dispatch = useDispatch()

    return (
        <div style={{background: "#0061F7", height: "70px",
        display: "flex", flexDirection: "row", gap: "40px",
        alignItems: "center", justifyContent: "space-between",
        width:"100%"}}>
  
      <div style = {{
        display: "flex", flexDirection: "row", gap: "40px",
        fontWeight: "600", fontSize: "18px",
        justifyContent: "start", alignItems: "center",
        paddingLeft: "20px"}}>
          <Avatar style={{ backgroundColor: "white", color: "orange" }}>
              <img
                src={jaabirLogo}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
              </Avatar>
              {tabs.map(tab => (
                <p style={{margin: "0px", cursor: "pointer",
              color: "white",
            opacity: tab == activeTab ? 1 : 0.8}}
            onClick = {()=> setActiveTab(tab)}> {tab}</p>
              ))}
          </div>
          <BiArrowBack
              style={{
                color: "white",
                fontSize: "35px",
                marginRight: "25px",
                fontWeight: "700",
                cursor: "pointer",
                alignContent: "end"
                }}
              onClick={()=> dispatch(setIsReports(false))}
            />
      </div>
    )
}

export default Header