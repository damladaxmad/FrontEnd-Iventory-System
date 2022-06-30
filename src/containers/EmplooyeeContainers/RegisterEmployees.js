import React, { useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { TextField, Button } from "@mui/material";


const RegisterEmployees = (props) => {
  const arr = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter Email", type: "gmail", name: "email" },
    { label: "Enter Salary", type: "text", name: "salary" },
    { label: "Enter Role", type: "text", name: "role" },
    { label: "Enter Sex", type: "text", name: "sex" },
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
      errors.city = "Field is Required";
    }
  
    if (!values.sex) {
      errors.sex = "Field is Required";
    } else if (
      values.sex.toLowerCase() !== "male" &&
      values.sex.toLowerCase() !== "female"
    ) {
      errors.sex = "No qaniis allowed";
    }
    if (!values.salary && values.salary != 0) {
      errors.monthlyFee = "Field is Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: props.update ? props.empoloyee.email : "",
      name: props.update ? props.empoloyee.name : "",
      sex: props.update ? props.empoloyee.sex : "",
      salary: props.update ? props.empoloyee.salary : "",
      role: props.update ? props.empoloyee.role : "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      console.log(props.empoloyee._id)
      if (props.update){
        axios.patch(`http://127.0.0.1:80/api/v1/employees/${props.empoloyee._id}`, values).then((res) => {
          alert("Successfully Updated")
        }).catch((err) => {
          alert("Couldn't update Employee")
        });
        props.reset()
      } else {
        axios.post(`http://127.0.0.1:80/api/v1/employees`, values).then((res) => {
          alert("Successfully Created")
        });
        resetForm();
        props.reset()
      }    
    
    },
  });

  useEffect(()=>{

  }, [props])

  return (
    <div
      style={{
        height: "100%",
        width: "95%",
        margin: "0px auto",
        marginTop: "20px",
        display: "flex",
        gap: "14px",
        background: "white",
        flexDirection: "column",
        borderRadius: "10px",
        padding: "28px",
      }}
    >
      <h2>Register Employee </h2>
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
  

        <Button
          style={{
            width: "290px",
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

export default RegisterEmployees;
