import MaterialTable from "material-table";
import { Button } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {useSelector, useDispatch } from "react-redux";
import { FormControl, Select, MenuItem, Menu, TextField } from "@mui/material";
import { BiDotsHorizontalRounded } from "react-icons/bi"; 
import CloseIcon from '@mui/icons-material/Close';
import SalesTable from "../containers/SalesContainers/SalesTable";
import BrowseSales from "../containers/SalesContainers/BrowseSales";
import { setCustomers } from "../redux/actions/customersActions";
import { setOrderList } from "../redux/actions/orderListActions";

function Sales() {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [change, setChange] = useState(1)
  const statusArr = ["cash", "invoice"]
  const [status, setStatus] = useState();
  const [data, setData] = useState([])

  const selectStyle = {   color: "#B9B9B9",
  width: "270px", }

  const fetchCustomers = async () => {
    const response = await axios
      .get("/api/v1/customers")
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(setCustomers(response.data.data.customers));
  }

  useEffect(()=> {
    fetchCustomers()
  },[])

  const customers = useSelector(state => state.customers.customers)
  const orderList = useSelector(state => state.orderList.orderList)
  const [customer, setCustomer] = useState()
  const [total, setTotal] = useState(0)

  const statusHandler = (e) => {
    setStatus(e.target.value)
  }
  const customerHandler = (e) => {
    setCustomer(e.target.value)
  }

  const browseHandler = () => {
    setShow(true)
  }

  const hideModal = () => {
    setShow(false)
  }

  const dataHandler = (data) => {
    console.log(`this is the json ${data}`)
    setData(arr => [...arr, data] )
  }
  
  useEffect(()=> {
    dispatch(setOrderList(data))
  }, [data])
  const totalHandler = (t) => {
    setTotal(t)
  }


  useEffect(()=> {
  }, [orderList])

  return (
    <div
      style={{
        height: "100%",
        width: "95%",
        margin: "0px auto",
        display: "flex",
        // alignItems: "center",
        gap: "0px",
        flexDirection: "column",
      }}
    >
        <h2 style={{fontWeight: "700"}}> New Order</h2>

        {show && <BrowseSales hideModal = {hideModal}
        data = {dataHandler}/>}
     
        <div style={{ display: "flex", gap: "0px",
        justifyContent: "space-around", background: "white",
        alignItems: "center",
        padding: "20px", borderRadius: '10px 10px 0px 0px', marginTop: "20px" }}>
        
          <FormControl style={{ padding: "0px", margin: "0px" }}>
          <TextField
            select
            style={selectStyle}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label = "Select Type"
            onChange={statusHandler}
          >
            {statusArr.map((status, index) => (
              <MenuItem value={status} key={index}>
                {status}
              </MenuItem>
            ))}
          </TextField>
          </FormControl>
          <FormControl style={{ padding: "0px", margin: "0px" }}
          disabled = {status == "cash" ? true : false}>
        <TextField
            disabled = {status == "invoice" ? false : true}
            select
            style={selectStyle}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={customer}
            label = "Select Customer"
            onChange={customerHandler}
          >
            {customers.map((customer, index) => (
              <MenuItem value={customer._id} key={index}>
                {customer.name}
              </MenuItem>
            ))}
          </TextField>
          </FormControl>
          <Button
          variant="contained"
          style={{
            backgroundColor: "#2F49D1",
            color: "white", width: "200px",
            height: "50px", fontSize: "18px"
          }}
          onClick = {browseHandler}
          
        >
          browse
        </Button>
      {/* <p style={{margin: "0px", fontWeight: "bolder",
        fontSize: "16px", background: "#F0F2FA", 
        border: "1px solid #C7C7C7", padding: "8px 12px",
        borderRadius: "6px"}}> ${total}.00</p> */}
      </div>

      <SalesTable data = {orderList} customer = {customer}
      paymentType = {status} total = {totalHandler}/>
     
    
    </div>
  );
}


export default Sales;
