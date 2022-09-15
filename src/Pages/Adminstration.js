import React, { useState, useEffect, useReducer } from "react"
import {Tabs, Tab, Box} from "@mui/material"
import Users from "../containers/AdminstrationContainers/UsersContainer/Users"
import Access from "../containers/AdminstrationContainers/AccessContainers/Access";
import { useSelector } from "react-redux";
import CompanyInfo from "../containers/AdminstrationContainers/CompanyInfoContainer/CompanyInfo";
import ImportProducts from "../containers/AdminstrationContainers/ImportContainers/ImportProducts";

const Adminstration = () => {

  const statusArr = ["All", "Active", "Inactive"]
  const activeUser = useSelector(state => state.activeUser.activeUser)

  const [value, setValue] = React.useState("users");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  
  return (
    <div
    style={{
      height: "100%",
      width: "100%",
      margin: "0px auto",
      display: "flex",
      gap: "0px",
      flexDirection: "column",
    }}
  >
     <Box sx={{ width: "95%", margin: "auto" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="black"
            indicatorColor="primary"
            aria-label="secondary tabs example"
            disableFocusRipple = {true}
          >
            
       
          {activeUser.privillages?.includes("Users") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value="users" label="Users"
            style={{ fontSize: "16px", fontWeight: "700" }} />}

          {activeUser.privillages.includes("Access") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value="access" label="Access"
            style={{ fontSize: "16px", fontWeight: "700" }} />}

          {activeUser.privillages?.includes("Company Info") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value="companyInfo" label="Company Info"
            style={{ fontSize: "16px", fontWeight: "700" }} />}

          {activeUser.privillages?.includes("Import Products") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value="importProducts" label="Import Products"
            style={{ fontSize: "16px", fontWeight: "700" }} />}
          </Tabs>
        </Box>
    {value == "users" && <Users/>}
    {value == "access" && <Access/>}
    {value == "companyInfo" && <CompanyInfo/>}
    {value == "importProducts" && <ImportProducts/>}
    </div>
  );
};

export default Adminstration;
