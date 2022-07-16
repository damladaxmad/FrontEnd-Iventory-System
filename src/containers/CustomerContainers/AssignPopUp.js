import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import MyModal from "../../Modal/Modal"
import { useSelector } from "react-redux";

const Login = (props) => {

  const activeUser = useSelector(state => state.activeUser.activeUser)
  const [disabled, setDisabled] = useState(false)
  const [usernameOrPasswordError, setUsernameOrPasswordError] = useState('')
  const loginArr = [
    { label: "Enter Amount", type: "number", name: "credit" },
  ];

  const errorStyle = { color: "red", marginLeft: "27px", fontSize: "16px"}

  const validate = (values) => {
    const errors = {};

    if (!values.credit) {
      errors.credit = "Field is Required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      credit: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) =>  {
      values.type = "Payment"
      values.customer = props.customer._id
      values.user = activeUser.name
      setDisabled(true)

      const res = await axios.post(`http://127.0.0.1:80/api/v1/transactions`, values).then(()=> {
        props.hideModal()
        alert("Succesfully Paid")
        setDisabled(false)
      }
      ).catch((err)=> {
        props.hideModal()
        alert(err.response.data.message);
        setDisabled(false)
      }
      )
    },
  });

  return (
    <MyModal onClose = {props.hideModal} width = "300px">
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: "flex", gap: "16px", flexWrap: "wrap",
      justifyContent: "center", flexDirection: "column", width: "380px",
      padding:"20px 0px",
      alignItems: "center"
     }}
    >
      {loginArr.map((a, index) => (
        <div>
          <input
            placeholder={a.label}
            id={a.name}
            name={a.name}
            type={a.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[a.name]}
            style={{
              width: "290px",
              height: "50px",
              padding: "15px",
              fontSize: "16px",
              border: "1px solid grey",
              borderRadius: "6px",
            }}
            key={index}
          />
          {formik.touched[a.name] && formik.errors[a.name] ? (
            <div style={{ color: "red" }}>{formik.errors[a.name]}</div>
          ) : null}
        </div>
      ))}

      <button
        disabled = {disabled}
        style={{
          width: "290px",
          fontSize: "20px",
          backgroundColor: disabled ? "lightgrey" : "#2F49D1",
          fontWeight: "600",
          color: "white",
          height: "40px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        type="submit"
      >
        {" "}
        Pay
      </button>
      { usernameOrPasswordError != '' ? <div style={errorStyle}> 
      Username or password is incorrect</div> : null}
    </form>
    </MyModal>
  );
};

export default Login;
