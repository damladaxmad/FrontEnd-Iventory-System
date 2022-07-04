import React, { useState, useEffect, useReducer } from "react";
import { Button } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import {Select} from "@mui/material"
import CustomersTable from "../containers/CustomerContainers/CustomersTable";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import RegisterCustomers from "../containers/CustomerContainers/RegisterCustomers";
import { setCustomers } from "../redux/actions/customersActions";
import CustomerSales from "../containers/CustomerContainers/CustomerSales";
import CustomerDetails from "../containers/CustomerContainers/CustomerDetails";

const Customers = (props) => {
  const [newCustomers, setNewCustomers] = useState(false)
  const [buttonName, setButtonName] = useState('Add New Customers')
  const [update, setUpdate] = useState(false)
  const [showCornerIcon, setShowCornerIcon] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [updatedCustomer, setUpdatedCustomer] = useState(null)
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [showProfile, setShowProfile] = useState(false)
  const [assignMany, setAssignMany] = useState(false)
  const [CustomerIds, setCustomersIds] = useState('')
  const [customerTransactions, setCustomerTransactions] = useState()
  const [state, setState] = useState('')
  const activeUser = useSelector(state => state.activeUser.activeUser)
  const [sale, setSale] = useState(false)

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
    forceUpdate()
  }

  const dispatch = useDispatch()
  const customers = useSelector((state) => state.customers.customers);
  const statusArr = ["All", "Pending", "Late", "Clear"]
  const [status, setStatus] = useState(statusArr[0]);
  const [query, setQuery] = useState("");
  const [force, setForce] = useState(1)

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
    if (data.length > 0) {
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

  const fetchCustomers = async (status) => {
    if (status !== "All"){
      const response = await axios
      .get(`http://127.0.0.1:80/api/v1/customers?status=${status}`)
      .catch((err) => {
        alert(err.message);
      });
    dispatch(setCustomers(response.data.data.customers));
    if (response.data.data.products.length < 1)
    setState("No customers to display!")
    } else {
      const response = await axios
      .get("http://127.0.0.1:80/api/v1/customers")
      .catch((err) => {
        alert(err.message);
      });
    dispatch(setCustomers(response.data.data.customers));
    if (response.data.data.customers?.length < 1)
    setState("No customers to display!")
  }
  

  };

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
    fetchCustomers(status)
  }, [force, ignored])

  useEffect(()=> {
    if (query != '') {
      setState("No matching customers!")
    }
  }, [query])

  const showProfileHandler = (data, type) => {
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
      {!props.called && <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "95%",
          margin: "auto",
        }}
      >
        {/* {assignMany && <AssignManyToClass hideModal = {hideModal}
        studentsIds = {studentIds}/>} */}
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
      {!newCustomers && !showProfile && !sale &&
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
      {!newCustomers && !showProfile && !sale && <CustomersTable data={handler(customers)} 
      change = {changeHandler} selectCustomers = {selectHandler}
      update = {updateHandler} showProfile = {showProfileHandler}
      state = {state} />}
      {newCustomers && <RegisterCustomers update = {update}
      customer = {updatedCustomer} reset = {resetFomr}/>}
      {showProfile && <CustomerSales customer = {customerTransactions}/>}
      {sale && <CustomerDetails customer = {customerTransactions}/>}

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
