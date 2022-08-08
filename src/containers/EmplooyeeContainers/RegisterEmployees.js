import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import Modal from "../../Modal/Modal";
import { constants } from "../../Helpers/constantsFile";

const RegisterEmployees = (props) => {

  const arr = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter Email", type: "gmail", name: "email" },
    { label: "Enter Role", type: "text", name: "role" },
  ];

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Field is Required";
    } else if (values.email.length < 4) {
      errors.email = "Must be 5 characters or more";
    }
    if (!values.name) {
      errors.name = "Field is Required";
    }
   
    if (!values.role) {
      errors.role = "Field is Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: props.update ? props.empoloyee.email : "",
      name: props.update ? props.empoloyee.name : "",
      role: props.update ? props.empoloyee.role : "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      if (props.update){
        axios.patch(`${constants.baseUrl}/employees/${props.empoloyee._id}`, values).then((res) => {
          alert("Successfully Updated")
          props.change()
          props.hideModal()
        }).catch((err) => {
          alert(err.response.data.message);
        });
        props.reset()
      } else {
        axios.post(`${constants.baseUrl}/employees`, values).then((res) => {
          alert("Successfully Created")
          props.change()
          props.hideModal()
        }).catch((err) => {
          alert(err.response.data.message);
        });
        resetForm();
        props.reset()
      }    
    
    },
  });

 
  return (
    <Modal onClose = {props.hideModal} pwidth = "450px">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "15px"
        }}
      >
        <h2>{props.update ? "Employee Update" : "Employee Creation"}</h2>
     

        <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", gap: "16px",
      flexDirection: "column", alignItems: "center" }}
      >
        {arr.map((a, index) => (
          <div>
            <TextField
              variant="outlined"
              label={a.label}
              id={a.name}
              name={a.name}
              type={a.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[a.name]}
              style={{ width: "290px", color: "black" }}
              key={index}
            />
            {formik.touched[a.name] && formik.errors[a.name] ? (
              <div style={{ color: "red" }}>{formik.errors[a.name]}</div>
            ) : null}
          </div>
        ))}
  

        <Button
          style={{
            width: "190px",
            fontSize: "16px",
            backgroundColor: "#2F49D1",
            color: "white",
          }}
          type="submit"
          variant="contained"
        >
          {props.update ? "Update Employee": "Create Employee"}
        </Button>
      </form>

      </div>
    </Modal>
  );
};

export default RegisterEmployees;
