import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { selectClasses } from "@material-ui/core";
import axios from "axios";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Select, Button } from "@mui/material";

const RegisterStudents = (props) => {
  const arr = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter Unit Price", type: "number", name: "unitPrice" },
    { label: "Enter Sales Price", type: "number", name: "salePrice" },
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

    if (!values.name) {
      errors.name = "Field is Required";
    }
  
    // if (!values.quantity && values.quantity!=0) {
    //   errors.quantity = "Field is Required";
    // }

    if (!values.unitPrice) {
      errors.unitPrice = "Field is Required";
    }
  
    if (!values.salePrice) {
      errors.salePrice = "Field is Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: props.update ? props.product.name : "",
      salePrice: props.update ? props.product.salePrice : "",
      quantity: props.update ? props.product.quantity : "",
      unitPrice: props.update ? props.product.unitPrice : "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
        if (props.update){
          axios.patch(`http://127.0.0.1:80/api/v1/products/${props.product._id}`, values).then((res) => {
            alert("Successfully Updated")
            props.change()
          }).catch((err)=> alert(err.response.data.message));
          props.reset()
        } else {
          axios.post(`http://127.0.0.1:80/api/v1/products`, values).then((res) => {
            alert("Successfully Created")
            props.change()
          }).catch((err) => alert(err.response.data.message));
          props.reset()
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

export default RegisterStudents;
