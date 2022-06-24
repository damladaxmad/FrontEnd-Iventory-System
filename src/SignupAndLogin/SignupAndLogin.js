import React, { useEffect, useState } from "react";
import { TextField, Button, } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import Login from "./Login";
// const {BrowserWindow} = window.require('electron').remote
// const remote = window.require('electron').remote

const SignupAndLogin = (props) => {

    const handler = () => {
        props.showHandler()
    }

    const showHandler = () => {
      props.showHandler()
        // const win = remote.getCurrentWindow();
        // win.maximize();
    }

    const parentDivStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent:"center",
        alignItems: "center",
        minWidth: "400px%",
        maxWidth: "400px",
        marginBottom: "10px",
        gap: "16px",
        background: "white",
        padding: '16px',
        borderRadius: "10px",
        marginTop: "13%"
      }

    
  return (
    <div
      style={parentDivStyle}
    >

        <p style={{margin: "0px",
        fontSize:"28px", fontWeight: "700",
        color: "#2F49D1",}}
        >Login</p>
     
      <Login showHandler = {showHandler}/>
    </div>
  );
};

export default SignupAndLogin;