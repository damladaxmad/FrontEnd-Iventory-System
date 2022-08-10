import React, { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import { useFormik } from "formik";
import { selectClasses } from "@material-ui/core";
import axios from "axios";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import {Select, TextField, Button} from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { constants } from "../../Helpers/constantsFile";

const RegisterProducts = (props) => {

  const arr = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter Unit Price", type: "number", name: "unitPrice" },
    { label: "Enter Sales Price", type: "number", name: "salePrice" },
  ];

  const validate = (values) => {
    const errors = {};
   
    if (!values.name) {
      errors.name = "Field is Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: props.update ? props.product.name : "",
      salePrice: props.update ? props.product.salePrice : "",
      unitPrice: props.update ? props.product.unitPrice : "",
      quantity: props.update ? props.product.quantity : "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
        if (props.update){
          axios.patch(`${constants.baseUrl}/products/${props.product._id}`, values).then((res) => {
            alert("successfully updated")
            props.reset()
            props.hideModal()
          }).catch((err) => {
            alert(err.response.data.message);
            props.hideModal()

          });
          
        } else {
          axios.post(`${constants.baseUrl}/products`, values).then((res) => {
            alert("Successfully Created Customer")
            props.reset()
            props.hideModal()
          }).catch((err) => {
            alert(err.response.data.message);
            props.hideModal()
          });
          resetForm();
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
        <h2>Update Product </h2>
     

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
          {props.update ? "Update Product": "Create Product"}
        </Button>
      </form>

      </div>
    </Modal>
  );
};
export default RegisterProducts;