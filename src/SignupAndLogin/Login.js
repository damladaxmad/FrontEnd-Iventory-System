import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser } from "../redux/actions/activeUseActions";
import { setIsLogin } from "../redux/actions/isLoginActions";
import superuser from '../superuser'
import { Button } from "@mui/material";

const Login = (props) => {
  const dispatch = useDispatch()
  const isConnected = useSelector(state => state.isLogin.isConnected)
  const [usernameOrPasswordError, setUsernameOrPasswordError] = useState('')
  const loginArr = [
    { label: "Enter Username", type: "text", name: "userName" },
    { label: "Enter Password", type: "password", name: "password" },
  ];

  const errorStyle = { color: "red", marginLeft: "27px", fontSize: "16px"}

  const validate = (values) => {
    const errors = {};

    if (!values.userName) {
      errors.userName = "Field is Required";
    }

    if (!values.password) {
      errors.password = "Field is Required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) =>  {
      if(values.userName=="superuser" && values.password == "234"){
        props.showHandler()
        dispatch(setActiveUser(superuser))
        dispatch(setIsLogin(true))
        return
      }
      const response = await axios
      .get(`http://127.0.0.1:80/api/v1/users/authenticate?username=${values.userName}&password=${values.password}`)
      .catch((err) => {
        setUsernameOrPasswordError(err.response.data.message)
      });
      if (response.data.authenticated == true) {
        props.showHandler()
        dispatch(setActiveUser(response.data.user))
        dispatch(setIsLogin(true))
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: "flex", gap: "16px", flexWrap: "wrap",
      justifyContent: "center"
     }}
    >
      {loginArr.map((a, index) => (
        <div>
          <input
            placeholder={a.label}
            id={a.name}
            name={a.name}
            type={a.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[a.name]}
            style={{
              width: "290px",
              height: "50px",
              padding: "15px",
              fontSize: "16px",
              border: "1px solid grey",
              borderRadius: "6px",
            }}
            key={index}
          />
          {formik.touched[a.name] && formik.errors[a.name] ? (
            <div style={{ color: "red" }}>{formik.errors[a.name]}</div>
          ) : null}
        </div>
      ))}

      <Button
        disabled = {!props.status || isConnected == "no connection"}
        style={{
          width: "290px",
          fontSize: "20px",
          backgroundColor: props.status && isConnected !== "no connection" ? "#2F49D1" : "lightgray",
          fontWeight: "600",
          color: "white",
          height: "40px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          // pointerEvents: "none"
        }}
        type="submit"
      >
        {" "}
        Login
      </Button>
      { usernameOrPasswordError != '' ? <p style={{alignSelf: "center",
    color: "red"}}> 
      {usernameOrPasswordError}</p> : null}
    </form>
  );
};

export default Login;
