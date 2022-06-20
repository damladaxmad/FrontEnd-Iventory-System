import React, { useEffect, useState } from "react";
import axios from "axios";

const SettingsPage = () => {

  const [image, setImage] = useState()

  const fetchCompanyInfo = async () => {
    const res = await axios.get('api/v1/companyInfo')
    console.log(res.data.data)
    setImage(res.data.data.imageURl)
  }

  useEffect(()=>{
    fetchCompanyInfo()
  })

  
  return (
    <div
    style={{
      height: "100%",
      width: "95%",
      margin: "0px auto",
      display: "flex",
      gap: "14px",
      flexDirection: "column",
    }}
  >
    <h2> Settings</h2>
    <p> </p>
    <img src = {image} alt = " loading..."
    style= {{width: "350px", height: "150px"}}/>
    </div>
  );
};

export default SettingsPage;
