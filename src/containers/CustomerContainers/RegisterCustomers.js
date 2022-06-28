import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { selectClasses } from "@material-ui/core";
import axios from "axios";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import {Select, TextField, Button} from "@mui/material"
import { useDispatch, useSelector } from "react-redux";

const RegisterStudents = (props) => {
  const arr = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter Email", type: "gmail", name: "email" },
    { label: "Enter Phone", type: "text", name: "phone" },
    { label: "", type: "date", name: "deadline" },
  ];

  const sexes = ["male", "female"]
  const statuses = ["Active", "Inactive"]
  const [status, setStatus] = useState(statuses[0])
  const [sex, setSex] = useState()

  const sexHandler = (e) => {
    setSex(e.target.value);
  }; 
  const statusHandler = (e) => {
    setStatus(e.target.value);
  }; 

 

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
  
    if (!values.phone) {
      errors.phone = "Field is Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: props.update ? props.customer.email : "",
      name: props.update ? props.customer.name : "",
      sex: props.update ? props.customer.sex : "",
      city: props.update ? props.customer.city : "",
      parent: props.update ? props.customer.parent : "",
      phone: props.update ? props.customer.phone : "",
      deadline: props.update ? props.customer.deadline : "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      values.sex = sex
      values.status = status
        if (props.update){
          axios.patch(`http://127.0.0.1:80/api/v1/customers/${props.customer._id}`, values).then((res) => {
            alert("successfully update")
          });
          props.reset()
        } else {
          axios.post(`http://127.0.0.1:80/api/v1/customers`, values).then((res) => {
            alert("Successfully Created Customer")
            props.reset()
          });
          resetForm();
        }
    
    },
  });


  useEffect(()=>{

  }, [props])

  const parentDivStyle = { height: "100%", width: "95%",
    margin: "0px auto", marginTop: "20px", display: "flex",
    gap: "14px", background: "white", flexDirection: "column",
    borderRadius: "10px", padding: "28px",
  }
  
  const selectStyle = {  height: "50px", color: "#B9B9B9",
  width: "290px", }

  return (
    <div
      style={parentDivStyle}
    >
      <h2>Register Customers </h2>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
      >
        {arr.map((a, index) => (
          <div>
            <TextField
              label={a.label}
              id={a.name}
              name={a.name}
              type={a.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[a.name]}
              style={{ width: "290px" }}
              key={index}
            />
            {formik.touched[a.name] && formik.errors[a.name] ? (
              <div style={{ color: "red" }}>{formik.errors[a.name]}</div>
            ) : null}
            
          </div>
        ))}
         <FormControl >
          <TextField
          select
            style={selectStyle}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sex}
            label = "Enter Sex"
            onChange={sexHandler}
          >
            {sexes.map((sex, index) => (
              <MenuItem value={sex} key={index}>
                {sex}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        {formik.touched.sex && formik.errors.sex ? (
              <div style={{ color: "red" }}>{formik.errors.sex}</div>
            ) : null}
      
        <Button
          style={{
            width: "290px",
            height: "50px",
            fontSize: "16px",
            backgroundColor: "#2F49D1",
          }}
          type="submit"
          variant="contained"
        >
          {props.update ? "Update" : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default RegisterStudents;
