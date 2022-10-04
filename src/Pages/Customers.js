import React, { useState, useEffect, useReducer } from "react";
import { Button, Tab } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import {Select} from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { setCustomers } from "../redux/actions/customersActions";
import { constants } from "../Helpers/constantsFile";
import useFetch from "../funcrions/DataFetchers";
import moment from "moment";
import Table from "../utils/Table";
import Register from "../utils/Register";
import Transactions from "../utils/Transactions";
import CustomerVendorSales from "../utils/CustomerVendorSales";

const Customers = (props) => {
  const [newCustomers, setNewCustomers] = useState(false)
  const [buttonName, setButtonName] = useState('Add New Customers')
  const [update, setUpdate] = useState(false)
  const [showCornerIcon, setShowCornerIcon] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [updatedCustomer, setUpdatedCustomer] = useState(null)
  const [showProfile, setShowProfile] = useState(false)
  const [assignMany, setAssignMany] = useState(false)
  const [CustomerIds, setCustomersIds] = useState('')
  const [customerTransactions, setCustomerTransactions] = useState()
  const [state, setState] = useState('')
  const activeUser = useSelector(state => state.activeUser.activeUser)
  const [sale, setSale] = useState(false)
  const dispatch = useDispatch()
  const customers = useSelector((state) => state.customers.customers);
  const statusArr = ["All", "Pending", "Late", "Clear"]
  const [status, setStatus] = useState(statusArr[0]);
  const [query, setQuery] = useState("");
  const [force, setForce] = useState(1)

  const columns = [
   
    { title: "Customer Name", field: "name" , width: "8%",},
    { title: "Phone", field: "phone", render: (data) => {
      if (data.phone) return <p> {data.phone}</p>
    else return <em>no phone</em>}
   },
    {
      title: "Deadline",
      field: "date",
      render: (data) => {
        const formatted = moment(data.deadline).format("DD/MM/YYYY");
        if (formatted == "Invalid date") return <em> no deadline</em>
        return <p>{formatted}</p>;
      },  
    },
    { title: "Balance", field: "balance", render: (data) =>
    <p>{data.balance < 0 ? `-${constants.moneySign}${data.balance*-1}` : `${constants.moneySign}${data.balance}`}</p>
  },
    { title: "Stutus", field: "status", render: (row)=> <span
    style={{color: row.status == "Late" ? "#FFAC32" 
    : row.status == "Clear" ? "#65a765" : "#5887FF"}}>
      {row.status}
    </span>}, 
  ];

  const fields = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter phone", type: "text", name: "phone" },
    { label: "", type: "date", name: "deadline" },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, student) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const assignMannyToClass = () => {
    setAssignMany(true)
    setAnchorEl(null);
  }
  const changeHandler = () => {
    setForce(state => state + 1)
  }


  const statusHandler = (e) => {
    setStatus(e.target.value)
  }

  const addCustomerHandler = () => {
    setQuery('')
    if (buttonName == "Add New Customers"){
      setNewCustomers(true)
      setButtonName("Go To Customers")
      setShowProfile(false)
      setSale(false)
      return
    } else if (buttonName == "Go To Customers") {
      setShowProfile(false)
      setSale(false)
      setNewCustomers(false)
      setButtonName("Add New Customers") 
      setUpdate(false)
    }
    
  }

  const handler = (data) => { 
    if (data?.length > 0) {
      if (query == ""){
        return data.filter(
          (std) =>
          std.status == status || status == "All"
        );
      }
      else {
        return data.filter(
          (std) =>
          (std.status == status || status == "All") && (
        std.name.toLowerCase().includes(query) ))
      }
    } else {
      return
    }
  };

  
    dispatch(setCustomers(useFetch("customers/customers-with-transactions", force, "customers")))

  let customersIds = '';
  const selectHandler = (data) => {
    data.map((d)=> {
      customersIds += d._id
      customersIds += ','
    })
    const slicedCustomersIds = customersIds.slice(0, -1)
    setCustomersIds(slicedCustomersIds)

    setShowCornerIcon(true)
    if (data.length < 1) {
      setShowCornerIcon(false)
    }
  }

  const updateHandler = (customer) => {
    setNewCustomers(true)
    setButtonName("Go To Customers")
    setUpdate(true)
    setUpdatedCustomer(customer)
  }

  const resetFomr = () => {
    setUpdate(false)
    setForce(state => state + 1)
  }
  

  useEffect(()=> {
    setState("Loading...")
    // fetchCustomers(status)
  }, [force])

  useEffect(()=> {
    if (query != '' || status != "All") {
      setState("No matching customers!")
    }
  }, [query, status])

  const showTransactions = (data, type) => {
    if (type == "Sale") {
      setSale(true)
      setShowProfile(false)
      setButtonName("Go To Customers")
      setCustomerTransactions(data)
    }
    if (type == "Transaction") {
      setSale(false)
      setShowProfile(true)
      setButtonName("Go To Customers")
      setCustomerTransactions(data)
    }
  }

  const hideModal = () =>{
      setShowProfile(false)
      setSale(false)
      setNewCustomers(false)
      setButtonName("Add New Customers") 
      setUpdate(false)
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
      {!props.called && <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "95%",
          margin: "auto",
        }}
      >

        <h2> {newCustomers ? "Create New Customers" : 
        showProfile ? "Customer Transactions" : "Customers"}</h2>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#2F49D1",
            color: "white",
          }}
          onClick = {() => {
            if (activeUser.privillages.includes("Add New Customers")){
              addCustomerHandler()
            } else {
              alert("You have no access")
            }
          }}
          startIcon={
            newCustomers || showProfile || sale ? <BiArrowBack
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
      </div>}
      {!showProfile && !sale &&
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
      
          <FormControl style={{ padding: "0px", margin: "0px" }}>
          <Select
            style={{  height: "40px", color: "#B9B9B9",
            width: "150px", }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            onChange={statusHandler}
          >
            {statusArr.map((status, index) => (
              <MenuItem value={status} key={index}>
                {status}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
          {showCornerIcon && <BiDotsVerticalRounded style = {{
            fontSize: "24px", margin: "auto 0px",
            cursor: "pointer"
          }} onClick = {handleClick} />}
        </div>
      </div>}
      {!showProfile && !sale && <Table data={handler(customers)} 
      change = {changeHandler} selectCustomers = {selectHandler}
      update = {updateHandler} showTransactions = {showTransactions}
      state = {state} url = "customers" name = "Customer"
      columns = {columns}
      />}
      {newCustomers && <Register update = {update}
      hideModal = {hideModal}
      instance = {updatedCustomer} reset = {resetFomr}
      name = "Customer" fields = {fields} url = "customers"
      />}
      {showProfile && <Transactions instance = {customerTransactions}
      name = "Customer" />}
      {sale && <CustomerVendorSales instance = {customerTransactions}
      name = "Customer" type = "sale"/>}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={assignMannyToClass}>Assign to class</MenuItem>
        <MenuItem >Delete Customer</MenuItem>
      </Menu>
    </div>
  );
};

export default Customers;
