import React from "react";
import { useFormik } from "formik";
import { TextField, Button, Avatar, Typography } from "@mui/material";


const InfoContainer = (props) => {
    return (
      <div style={{}}>
        <p
          style={{
            marginTop: "10px",
            fontSize: "20px",
            color: "#171717",
            fontWeight: "700",
          }}
        >
          {props.infoName}
        </p>
       {props.infoData.map((d)=>(
  <div style={{ marginTop: "15px" }}>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <p
                style={{
                  margin: "0px",
                  fontSize: "16px",
                  color: "#171717",
                  fontWeight: "500",
                }}
              >
                {d.label}
              </p>
              <p
                style={{
                  margin: "0px",
                  fontSize: "16px",
                  color: "#B9B9B9",
                  fontWeight: "500",
                }}
              >
              {d.value}
              </p>
            </div>
          </div>
       ))}
          
    
      </div>
    );
  };

  export default InfoContainer