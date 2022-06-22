import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { TextField, Button, selectClasses } from "@mui/material";
import axios from "axios";
import SelectBox from "../../ReUsables/CustomSelect";
import { FormControl, Select, MenuItem, Menu } from "@mui/material";
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
      email: props.update ? props.student.email : "",
      name: props.update ? props.student.name : "",
      sex: props.update ? props.student.sex : "",
      city: props.update ? props.student.city : "",
      parent: props.update ? props.student.parent : "",
      phone: props.update ? props.student.phone : "",
      deadline: props.update ? props.student.deadline : "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      values.sex = sex
      values.status = status
        if (props.update){
          axios.patch(`/api/v1/customers/${props.student._id}`, values).then((res) => {
            alert("successfully update")
          });
          props.reset()
        } else {
          axios.post(`/api/v1/customers`, values).then((res) => {
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
    borderRadius: "10px", padding: "16px",
  }
  
  const selectStyle = {  height: "50px", color: "#B9B9B9",
  width: "290px", }

  return (
    <div
      style={parentDivStyle}
    >
      <h2>Register Students </h2>
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
      
        <FormControl >
          <TextField
          select
            style={selectStyle}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label = "Enter Sex"
            onChange={statusHandler}
          >
            {statuses.map((status, index) => (
              <MenuItem value={status} key={index}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <Button
          style={{
            width: "150px",
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
