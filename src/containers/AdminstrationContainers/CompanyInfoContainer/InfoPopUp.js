import Modal from "../../../Modal/Modal";
import { Button, Divider, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";

const InfoPopUp = (props) => {

  const [file, setFile] = useState()

  const arr = [
    { label: "Enter Company Name", type: "text", name: "name" },
    { label: "Enter Adress", type: "text", name: "address" },
    { label: "Enter Phone", type: "number", name: "phone" },
    { label: "Enter Email", type: "email", name: "email" },
    { label: "Enter Image Name", type: "text", name: "imageName" },
  ];

  const formData = new FormData()
  
  const handleFile = (e) => {
    console.log(e.target.files[0])
    if (e.target && e.target.files[0]) {
      // formData.append('logo', e.target.files[0])
    }
    setFile(e.target.files[0])
  }

  if (file) {
    formData.append('logo', file)
  }

  const validate = (values) => {
    const errors = {};
   
    if (!values.name) {
      errors.name = "Field is Required";
    }

    if (!values.phone) {
      errors.phone = "Field is Required";
    }

    if (!values.address) {
        errors.address = "Field is Required";
    }

    if (!values.email) {
        errors.email = "Field is Required";
    }

    if (!values.imageName) {
        errors.imageName = "Field is Required";
    }
  

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      imageName: "",
      address: ""
    },
    validate,
    onSubmit: (values, { resetForm }) => {

        formData.append('name', values.name)
        formData.append('address', values.address)
        formData.append('email', values.email)
        formData.append('phone', values.phone)
        formData.append('imageName', values.imageName)

        axios.post(`api/v1/companyInfo`, formData).then((res) => {
             alert("Successfully  Updated")
        }).catch(er => console.log(formData));
        resetForm();
    },
  });

 
  return (
    // <Modal onClose = {()=> props.hideModal()}>
      <div
        style={{
          display: "flex",
          // justifyContent: "center",
          width: "100%",
          alignItems: "center",
          flexDirection: "column",
          gap: "15px"
        }}
      >
        <h2>Create Company Info </h2>
     

        <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", gap: "16px",
      flexDirection: "row", justifyContent: "center",
    width: "80%", flexWrap: "wrap" }}
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
              style={{ width: "300px", color: "black" }}
              key={index}
            />
            {formik.touched[a.name] && formik.errors[a.name] ? (
              <div style={{ color: "red" }}>{formik.errors[a.name]}</div>
            ) : null}
          </div>
        ))}

        <div style={{display: "flex", justifyContent: "center",
      textAlign:"center", background: "#F3F3F3", width: "300px",
      alignItems: "center", fontWeight: "bolder", fontSize: "18px",
      borderRadius: "6px", border: "thin solid black",
      cursor: "pointer", maxHeight: "50px"}}>
        <label > Select Image
          <input id="inputTag" type="file" style={{display: "none"}}
          onChange = {(e) => handleFile(e)}/>
        </label>
</div>
        <Button
          style={{
            width: "190px",
            height: "50px",
            marginTop: "20px",
            fontSize: "16px",
            backgroundColor: "#2F49D1",
            color: "white",
          }}
          type="submit"
          variant="contained"
        >
          Create
        </Button>
      </form>

      </div>
    // </Modal>
  );
};

export default InfoPopUp;
