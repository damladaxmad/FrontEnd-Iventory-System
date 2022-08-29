import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { TextField, Button, FormControl, MenuItem } from "@mui/material";
import {AiOutlinePlus} from "react-icons/ai"
import Modal from "../Modal/Modal";
import { constants } from "../Helpers/constantsFile";
import { useSelector } from "react-redux";
import EmplooyeeTitle from "../containers/EmplooyeeContainers/EmployeeTitle";
import ExpenseType from "../containers/ExpenseContainers/ExpenseType";

const Register = (props) => {

  const employeeTitle = useSelector(state => state.employeeTitle.employeeTitle)
  const expenseTypes = useSelector(state => state.expenseType.expenseType)
  const [title, setTitle] = useState()
  const [empTitle, setEmpTitle] = useState(false)

  const showEmpTitle = () => {
    setEmpTitle(true)
  }

  const titleHandler = (e) => {
    setTitle(e.target.value)
  }

  const validate = (values) => {
    const errors = {};

    if (props.name == "Employee") {
        if (!values.email) {
            errors.email = "Field is Required";
          } else if (values.email.length < 4) {
            errors.email = "Must be 5 characters or more";
          }
        // if (!values.role) {
        //     errors.role = "Field is Required";
        //   }
    }
   if (props.name !== "Expense") {
     if (!values.name) {
       errors.name = "Field is Required";
     }
   }

   if (props.name == "Expense") {

    if (!values.description) {
      errors.description = "Field is Required";
    }
    if (!values.date) {
      errors.date = "Field is Required";
    }
    if (!values.amount) {
      errors.amount = "Field is Required";
    }
    if (!values.to) {
      errors.to = "Field is Required";
    }
  }

    return errors;
  };

  const formik = useFormik({
    initialValues: props.name == "Employee" ? {
      email: props.update ? props.instance.email : "",
      name: props.update ? props.instance.name : "",
      role: props.update ? props.instance.role : "",
    } : props.name == "Expense" ?  {
      description: props.update ? props.instance.description : "",
      expenseType: props.update ? props.instance.expenseType : "",
      date: props.update ? props.instance.date : "",
      amount: props.update ? props.instance.amount : "",
      user: props.update ? props.instance.user : "",
      to: props.update ? props.instance.to : "",
    }
    : {
        name: props.update ? props.instance.name : "",
        phone: props.update ? props.instance.phone : "",
        deadline: props.update ? props.instance.deadline : ""
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      if (props.name == "Employee") values.role = title
      if (props.name == "Expense") values.expenseType = title
  
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
    <Modal onClose = {props.hideModal} pwidth = {props.name == "Expense" ?"630px" : "450px"}
    left = {props.name == "Expense" ? "32%" : "35%"}>
      {(empTitle && props.name == "Employee") && <EmplooyeeTitle hideModal = {()=> setEmpTitle(false)}/>}
      {(empTitle && props.name == "Expense") && <ExpenseType hideModal = {()=> setEmpTitle(false)}/>}
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
      flexDirection: props.name == "Expense" ? "row" : "column", alignItems: "center",
    flexWrap: props.name == "Expense" ? "wrap" : "nowrap" }}
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

        {(props.name == "Employee" || props.name == "Expense") 
        && <div style = {{display: "flex", gap: "10px"}}>
          <FormControl
              style={{
                padding: "0px",
                margin: "0px",
                width: "232px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "8px",
              }}
              // disabled={status == "cash" ? true : false}
            >
              <TextField
                // disabled={status == "invoice" ? false : true}
                select
                style={{width: "232px", color: "black"}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={title}
                label="Select Title"
                onChange={titleHandler}
              >
               { props.name == "Employee" ? employeeTitle?.map((employeeTitle, index) => (
                  <MenuItem value={employeeTitle.title} key={index}>
                    {employeeTitle.title}
                  </MenuItem>
                ))
                :  expenseTypes?.map((expenseType, index) => (
                  <MenuItem value={expenseType.type} key={index}>
                    {expenseType.type}
                  </MenuItem>
                ))
              }
              </TextField>

              
            </FormControl>
            <div
                style={{
                  height: "48px",
                  width: "50px",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  border: "1px solid #BDBDBD",
                  borderRadius: "5px",
                }}
              >
                <AiOutlinePlus
                  style={{
                    color: "black",
                    opacity: 0.5,
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "25px",
                    fontWeight: "bolder",
                  }}
                  onClick = {showEmpTitle}
                />
              </div>
            </div>}

  

        <Button
          style={{
            width: "190px",
            fontSize: "16px",
            backgroundColor: "#2F49D1",
            color: "white",
            marginLeft: props.name == "Expense" && "200px"
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
