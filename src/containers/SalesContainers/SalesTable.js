import MaterialTable from "material-table";
import { Button, TextField } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {useSelector, useDispatch } from "react-redux";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import { Select } from "@mui/material";
import { BiDotsHorizontalRounded } from "react-icons/bi"; 
import CloseIcon from "@material-ui/icons/Close";
import TableRows from "./TableRows";
// import { CodeSharp } from "@material-ui/icons";
import { setOrderList } from "../../redux/actions/orderListActions";
import Invoice from "./Invoice";
import { constants } from "../../Helpers/constantsFile";

const SalesTable = (props) => {
  const dispatch = useDispatch()
  const activeUser = useSelector(state => state.activeUser.activeUser)
  const orderList = useSelector(state => state.orderList.orderList)
  const [showInvoice, setShowInvoice] = useState(false)
  const [invoiceData, setInvoiceData] = useState()
  
  const columns = ["Product Name", "Quantity", "Unit Price", "Total",
    "Actions"]

  const [force, setForce] = useState(1)
  const [disabled, setDisabled] = useState(false)

  const forceHandler = () => {
    setForce(state => state + 1)
  }
  useEffect(()=> {
  }, [force])

  const [p, setP] = useState([])

  const dataHandler = (d) => {

  }

  const quantityFun = (number, quantity, item) => {
    for (let i = 0; i<= props.data.length; i++){
      if(number == i){
        setP({...p, [number]: { ...p[number], quantity: parseInt(quantity) , item: item}})
      }
    }
  }

  const unitPriceFun = (number, unitPrice, item) => {
    for (let i = 0; i<= props.data.length; i++){
      if(number == i){
        setP({...p, [number]: { ...p[number], price: parseInt(unitPrice) ,
        item: item}})
      }
    }
  }

  const postSales = async (data) => {
    setInvoiceData(data)
    const res = await axios.post(`${constants.baseUrl}/sales`, data).then(()=>{
      alert("Successfully Completed Order")
      setShowInvoice(true)
      setDisabled(false)
      setP([])
      dispatch(setOrderList([]))
      props.complete()
    }).catch((err)=> {
      alert(err.response.data.message);
      setDisabled(false)
    })
  }

  const btnHandler = () => {
    setDisabled(true)
    let products = []
    for (let i = 0; i< props.data.length; i++){
      if (!p[i].quantity) p[i].quantity = 1
      if (!p[i].price) p[i].price = 0
      products.push(p[i])
    }
    const apiData = {products: products,
      user: activeUser.userName, customer: props.customer,
      paymentType: props.paymentType};
    if (apiData.products.length > 0 ) {
      postSales(apiData)
    }
    if (apiData.products.length < 1) {
      setDisabled(false)
      alert("please make orders")
    }

  }
  const totalAdd = () => {
    
    let products = []
    let total = 0
    for (let i = 0; i< props.data.length; i++){
   
        if (!p[i].quantity) p[i].quantity = 1
        if (!p[i].price) p[i].price = 0
        products.push(p[i])
      
    }
    
    products.map(p => {
      total += p.quantity * p.price
    })
    props.total(total)
  }

    useEffect(()=> {
      if (!Object.keys(p).length === 0) totalAdd()
    }, [p])

  useEffect(()=> {
  }, [props.data, orderList])

    return (
       <div style = {{width: "100%"}}>
          {showInvoice && <Invoice sale = {invoiceData}
          hideModal = {()=> setShowInvoice(false)}/>}

          <div style={{display: "flex", width: "100%", height: "50px",
            display: "flex", justifyContent: "space-between", padding: "20px",
            background: "#EFF0F6", alignItems: "center"}}>
            {columns.map(c => (
             <p style={{margin: "0px", fontWeight: "bold",
           fontSize: "14px", flex: c == "Product Name" ? 2 : 
            c == "Quantity" || c == "Unit Price" || c == "Total" ? 1 : 0.3}}> {c}</p>
           ))}
          </div>

          <div style={{display: "flex", width: "100%",
        display: "flex", justifyContent: "start", padding: "15px",
        borderRadius: "0px 0px 10px 10px", background: "white",
        flexDirection: "column", gap: "30px"}}>
            {orderList.map((data, index) => {
            return <TableRows value = {JSON.parse(data)} data = {(d) => dataHandler(d)}
             key = {index} number = {index}
             total = {(total)=>props.total(total)}
             quantityFun = {quantityFun} unitPriceFun = {unitPriceFun}
             change = {forceHandler}/>
})}
          </div>
          <Button
          variant="contained"
          disabled = {disabled}
          style={{
            backgroundColor: disabled ? "lightGrey" : "#2F49D1",
            color: "white", width: "200px",
            height: "45px", fontSize: "18px",
            marginTop: "40px",
            marginLeft: "40%"
          }}
          onClick = {btnHandler}
          
        >
          complete
        </Button>
       </div>

    )
}

export default SalesTable