import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import DisplayInfo from "./DiplayInfo";
import InfoPopUp from "./InfoPopUp";
import axios from "axios";

const parentDivStyle = {
    display: "flex",
    alignItems: "start",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0px",
    background: "white",
    width: "98%",
    margin: "auto",
    marginTop: "20px",
    borderRadius: "8px",
    flexDirection: "column",
    padding: "20px"
  };

const CompanyInfo = () => {

  const [showForm, setShowForm] = useState(false)
  const [showDisplay, setShowDisplay] = useState(false)
  const [data, setData] = useState()

  const fetchCompanyInfo = async () => {
    const res = await axios.get('api/v1/companyInfo')
    console.log(res.data.data)
    setData(res.data.data)
  }

  const buttonHandler = () => {
    setShowForm(true)
  }

  useEffect(()=>{
    fetchCompanyInfo()
    if (data) setShowDisplay(true)
  }, [data])
  
    return (
        <div style={parentDivStyle}>

         {showForm && <InfoPopUp /> }
         {showDisplay && <DisplayInfo/>}
         
          {!showForm && <Button
          style={{
            backgroundColor: "#2F49D1",
            fontSize: "18px",
            fontWeight: "550",
            color: "white",
            width: "150px",
            height: "40px",
          }}
          onClick={buttonHandler}
          variant="contained"
        >
            {showDisplay ? "Update" : "Create"}
        </Button>}
        </div>
    )
}

export default CompanyInfo