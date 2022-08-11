import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import Modal from "../Modal/Modal";
import { constants } from "../Helpers/constantsFile";

const Register = (props) => {

  const validate = (values) => {
    const errors = {};

    if (props.name == "Employee") {
        if (!values.email) {
            errors.email = "Field is Required";
          } else if (values.email.length < 4) {
            errors.email = "Must be 5 characters or more";
          }
        if (!values.role) {
            errors.role = "Field is Required";
          }
    }
   
    if (!values.name) {
      errors.name = "Field is Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: props.name == "Employee" ? {
      email: props.update ? props.instance.email : "",
      name: props.update ? props.instance.name : "",
      role: props.update ? props.instance.role : "",
    } : {
        name: props.update ? props.instance.name : "",
        phone: props.update ? props.instance.phone : "",
        deadline: props.update ? props.instance.deadline : ""
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      if (props.update){
        axios.patch(`${constants.baseUrl}/${props.url}/${props.instance._id}`, values).then((res) => {
          alert("Successfully Updated")
          resetForm();
          props.reset()
          props.hideModal()
          props.name == "Employee" && props.change()
        }).catch((err) => {
          alert(err.response?.data?.message);
        });
        props.reset()
      } else {
        axios.post(`${constants.baseUrl}/${props.url}`, values).then((res) => {
          alert("Successfully Created")
          resetForm();
          (props.name == "Customer" || props.name == "Vendor")&&props.reset()
          props.hideModal()
          props.name == "Employee" && props.change()
        }).catch((err) => {
          alert(err.response?.data?.message);
          // props.reset()
        });
        // props.change()
          props.hideModal()
          // props.reset()
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
        <h2>{props.update ? `${props.name} Update` : `${props.name} Creation`}</h2>
     

        <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", gap: "16px",
      flexDirection: "column", alignItems: "center" }}
      >
        {props.fields?.map((a, index) => (
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
          {props.update ? `Update ${props.name}` : `Create ${props.name}`}
        </Button>
      </form>

      </div>
    </Modal>
  );
};

export default Register;
