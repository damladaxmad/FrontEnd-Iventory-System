import React, { useState, useEffect, useReducer } from "react";
import { Button } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import {Select} from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { setEmployees } from "../redux/actions/employeesActions";
import { constants } from "../Helpers/constantsFile";
import useFetch from "../funcrions/DataFetchers";
import Table from "../utils/Table";
import Register from "../utils/Register";
import { setExpenses } from "../redux/actions/expensesActions";
import moment from "moment";

const Expenses = () => {

  const [newExpenses, setNewExpenses] = useState(false)
  const [buttonName, setButtonName] = useState('Add New Expenses')
  const [update, setUpdate] = useState(false)
  const [showCornerIcon, setShowCornerIcon] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [updatedExpense, setUpdatedExpense] = useState(null)
  const [del, setDel] = useState(1);
  const [showProfile, setShowProfile] = useState(false)
  const [assignMany, setAssignMany] = useState(false)
  const [expenseIds, setExpensesIds] = useState('')
  const [state, setState] = useState("")
  const activeUser = useSelector(state => state.activeUser.activeUser)
  const columns = [
    { title: "ID", field: "expenseNumber",},
    { title: "description", field: "description", width: "4%"},
    { title: "Expense Type", field: "expenseType" },
    { title: "Amount", field: "amount" },
    { title: "Date", field: "date", render: (data)=> <p>
        {moment(data.date).format("DD-MM-YYYY")}</p> },
    { title: "User", field: "user", width: "4%"},
    { title: "To", field: "to" },
    { title: "Status", field: "status" },
  ]
  const fields = [
    { label: "Enter description", type: "text", name: "description" },
    { label: "Enter Expense Type", type: "text", name: "expenseType" },
    { label: "Enter Date", type: "text", name: "date" },
    { label: "Enter Amount", type: "number", name: "amount" },
    { label: "Enter User", type: "text", name: "user" },
    { label: "Enter To", type: "text", name: "to" },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, student) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const changeHandler = () => {
    setDel(state => state + 1)
  }

  const dispatch = useDispatch()
  const expenses = useSelector((state) => state.expenses.expenses);
  dispatch(setExpenses(useFetch("expenses", del, "expenses")))
  
  const statusArr = ["All", "Active", "Inactive"]
  const [status, setStatus] = useState(statusArr[0]);
  const [query, setQuery] = useState("");
  const [force, setForce] = useState(1)

  const statusHandler = (e) => {
    setStatus(e.target.value)
  }

  const addExpenseHandler = () => {
    setQuery('')
    if (buttonName == "Add New Expenses"){
      setNewExpenses(true)
      setButtonName("Go To Expenses")
      setShowProfile(false)
      return
    } else if (buttonName == "Go To Expenses") {
      setShowProfile(false)
      setNewExpenses(false)
      setButtonName("Add New Expenses") 
      setUpdate(false)
    }
   
    
  }

  const handler = (data) => { 
 
    if (data?.length > 0) {
      return data.filter(
        (std) =>
        std.expenseType.toLowerCase().includes(query) ||
        std.expenseNumber.toString().toLowerCase().includes(query)
      );
    } else {
      return
    }  
  };

 
  let expensesIds = '';
  const selectHandler = (data) => {
    data.map((d)=> {
      expensesIds += d._id
      expensesIds += ','
    })
    const slicedExpensesIds = expensesIds.slice(0, -1)
    setExpensesIds(slicedExpensesIds)

    setShowCornerIcon(true)
    if (data.length < 1) {
      setShowCornerIcon(false)
    }
  }

  const updateHandler = (expense) => {
    setNewExpenses(true)
    setButtonName("Go To Expenses")
    setUpdate(true)
    setUpdatedExpense(expense)
  }

  const resetFomr = () => {
    setForce(state => state + 1)
  }

  useEffect(()=> {
    setState("Loading...")
  }, [force])

  useEffect(()=> {
  }, [del])

    useEffect(()=> {
    if (query != '') {
      setState("No matching expenses!")
    }
  }, [query])

  const showProfileHandler = () => {
    setShowProfile(true)
    setButtonName("Go To Expenses")
  }

  const hideModal = () =>{
    setAssignMany(false)
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        margin: "0px auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#EFF0F6",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "95%",
          margin: "auto",
        }}
      >
   
        <h2> {newExpenses ? "Create New Expenses" : 
        showProfile ? "Expense Profile" : "Expenses"}</h2>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#2F49D1",
            color: "white",
          }}
          onClick = {() => {
            if (activeUser.privillages.includes('Add New Expenses'))
            addExpenseHandler()
            else alert("You have no access!")
          }}
          startIcon={
            newExpenses || showProfile ? <BiArrowBack
              style={{
                color: "white",
              }}
            /> : <MdAdd
            style={{
              color: "white",
            }}
          />
          }
        >
          {buttonName}
        </Button>
      </div>
      {!showProfile &&
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          padding: "20px",
          background: "white",
          width: "95.3%",
          margin: "auto",
          marginTop: "20px",
          borderRadius: "8px 8px 0px 0px",
        }}
      >
        <input
          type="text"
          placeholder="Search"
          style={{
            width: "400px",
            height: "40px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "#EFF0F6",
            border: "none",
          }}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div style={{ display: "flex", gap: "20px" }}>
 
          {showCornerIcon && <BiDotsVerticalRounded style = {{
            fontSize: "24px", margin: "auto 0px",
            cursor: "pointer"
          }} onClick = {handleClick} />}
        </div>
      </div>}
      {!showProfile && <Table data={handler(expenses)} 
      change = {changeHandler} selectEmpoloyees = {selectHandler}
      update = {updateHandler} showProfile = {showProfileHandler}
      state = {state} columns = {columns} url = "expenses"
      name = "Expense"/>}
      {newExpenses && <Register update = {update}
      instance = {updatedExpense} reset = {resetFomr}  hideModal = {()=> {
        setUpdate(false)
        setNewExpenses(false)
        setButtonName("Add New Expenses")
      }}
      fields = {fields}  url = "expenses"
      name = "Expense"
      change = {changeHandler} />}


    </div>
  );
};

export default Expenses;
