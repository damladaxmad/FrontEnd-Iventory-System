import React, {useEffect, useState} from "react"
import jaabirLogo from "../../../assets/images/jaabirLogo.jpg";
import { Avatar } from "@mui/material";
import axios from "axios";

const DisplayInfo = () => {

    const [data, setData] = useState()

    const fetchCompanyInfo = async () => {
      const res = await axios.get('api/v1/companyInfo')
      setData(res.data.data)
    }
  
    useEffect(()=>{
      fetchCompanyInfo()
    }, [])

    return (
        <div style={{display: "flex", flexDirection: "column",
        justfiyContent: "center", alignItems: "center",
        gap: "20px", margin: "20px 0px", marginBottom: "30px"}}>
            <Avatar sx={{ width: 130, height: 130 }}
            style={{ backgroundColor: "white", color: "orange" }}>
              <img
                src={data?.imageURl}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                alt = "Loading..."
              />
              </Avatar>
              <p style={{margin: "0px", fontWeight: "700",
                fontSize:"25px"}}>{data?.name}</p>
              <p style={{margin: "0px", fontWeight: "500",
                fontSize:"22px"}}>{data?.address}</p>
            <p style={{margin: "0px", fontWeight: "500",
                fontSize:"22px"}}>{data?.email}</p>
            <p style={{margin: "0px", fontWeight: "500",
                fontSize:"22px"}}>{data?.phone}</p>
        </div>
    )
}

export default DisplayInfo