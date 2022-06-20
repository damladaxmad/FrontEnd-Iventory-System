import React from "react";
import { useFormik } from "formik";
import { TextField, Button, Avatar, Typography } from "@mui/material";


const UpperProfile = (props) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Avatar sx={{ height: "100px", width: "100px" }}>
          <img
            src={props.image}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Avatar>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p
            style={{
              margin: "0px",
              fontSize: "18px",
              color: "#171717",
              fontWeight: "700",
            }}
          >
            {props.name}
          </p>
          <Typography
            style={{
              color: "#B9B9B9",
              margin: "0px",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            {props.bio}
          </Typography>
        </div>
      </div>
    );
  };

  export default UpperProfile