import Modal from "../../Modal/Modal";
import { Button, Divider, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {Select} from "@mui/material"
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import { constants } from "../../Helpers/constantsFile";
import Emplooyees from "../../Pages/Employees";
import useFetch from "../../funcrions/DataFetchers";
import {AiOutlineDelete} from "react-icons/ai"
import { setEmployeeTitle } from "../../redux/actions/employeeTtileActions";
import { setExpenseType } from "../../redux/actions/expenseTypeActions";

const ExpenseType = (props) => {

  const [state, setState] = useState("")
  const [type, setType] = useState("")
  const dispatch = useDispatch()
//   console.log(useFetch("expenseType", state, "expenseTypes"))
  const expenseTypes = useSelector(state => state.expenseType.expenseType)
  dispatch(setExpenseType(useFetch("expenseType", state, "expenseTypes")))

  const deleteHandler = (id) => {
    axios.delete(`${constants.baseUrl}/expenseType/${id}`).then(()=> {
      alert("Successfully Deleted")
      setState(id)
    }).catch(()=> {
      alert("Could not delete")
    })
  }

  const addHandler = () => {
    if (type != "") {
      setState(type)
      setType("")
      axios.post(`${constants.baseUrl}/expenseType`, {
        type
      })
    }
  }

  useEffect(()=> {
    
  }, [type])

  return (
    <Modal onClose = {props.hideModal} pwidth = "350px" left = "43%">

        <div style={{width: "350px", display: "flex", gap: "10px",
      flexDirection: "column", height: "307px", padding: "20px",
      overflowY: expenseTypes?.length > 4 ? "scroll" : "none"}}>

      <h3 style={{alignSelf: "center"}}> Add Types</h3>

      <div style = {{display: "flex", gap: "10px", marginBottom: "10px"}}>
        <input
          type="text"
          placeholder="Enter Title"
          value= {type}
          style={{
            width: "230px",
            height: "35px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "#EFF0F6",
            border: "none",
          }}
          onChange={(e) => setType(e.target.value)}
        />
            <Button
          style={{
            width: "80px",
            height: "35px",
            fontSize: "16px",
            backgroundColor: "#2F49D1",
            color: "white",
          }}
          variant="contained"
          onClick={addHandler}
        >
          Add
        </Button>
      </div>

      {!expenseTypes && <p style = {{alignSelf: 'center'}}> Loading...</p>}

           {expenseTypes?.map(exp => {
            return <div style={{display: "flex", justifyContent: "space-between",
            width: "100%", fontSize: "16px", padding: "1px"}}> 
                <p key = {exp.id} > {exp.type}</p>
                <AiOutlineDelete style={{cursor: "pointer"}}
                onClick = {()=>deleteHandler(exp.id)}/>
            </div>
           })}

   </div>
    </Modal>
  );
};

export default ExpenseType;
