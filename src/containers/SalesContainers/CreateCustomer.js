import Modal from "../../Modal/Modal";
import { Button, Divider, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { FormControl, MenuItem } from "@material-ui/core";
import {Select} from "@mui/material"
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import { constants } from "../../Helpers/constantsFile";

const CreateCustomer = (props) => {

  const arr = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter phone", type: "text", name: "phone" },
    { label: "", type: "date", name: "deadline" },
  ];

  const validate = (values) => {
    const errors = {};
   
    if (!values.name) {
      errors.username = "Field is Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      deadline: ""
    },
    validate,
    onSubmit: (values, { resetForm }) => {
        axios.post(`${constants.baseUrl}/customers`, values).then((res) => {
        alert("Successfully created Customer")
        props.hideModal();  
        }).catch(err => {
          props.hideModal();
          alert(err.response.data.message)});
        resetForm(); 
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
        <h2>Customer Creation </h2>
     

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
          Create Customer
        </Button>
      </form>

      </div>
    </Modal>
  );
};

export default CreateCustomer;
