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
import { setPurchaseList } from "../../redux/actions/purchaseListActions";
// import { CodeSharp } from "@material-ui/icons";


const PurchasesTable = (props) => {
  const dispatch = useDispatch()
  const activeUser = useSelector(state => state.activeUser.activeUser)
  const purchaseList = useSelector(state => state.purchaseList.purchaseList)
  
  const columns = ["Product Name", "Available", "QuantityIn", "Unit Price", 
  "AvgCost", "Total",
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
        setP({...p, [number]: { ...p[number], unitPrice: parseFloat(unitPrice) ,
        item: item}})
      }
    }

  }

  const postSales = async (data) => {
    const res = await axios.post(`http://127.0.0.1:80/api/v1/purchases`, data).then(()=>{
      alert("Successfully Completed Purchase")
      console.log(data)
      setDisabled(false)
      setP([])
      dispatch(setPurchaseList([]))
    }).catch(()=> {
      alert("Failed To Complete")
      console.log(data)
      setDisabled(false)
    })
  }

  const btnHandler = () => {
    setDisabled(true)
    let products = []
    for (let i = 0; i< props.data.length; i++){
      if (!p[i].quantity) p[i].quantity = 1
      if (!p[i].unitPrice) p[i].price = 0
      products.push(p[i])
    }
    const apiData = {products: products,
      user: activeUser.name, vendor: props.vendor,
      paymentType: props.paymentType};
    if (apiData.products.length > 0 ) {
      postSales(apiData)
    }
    if (apiData.products.length < 1) {
      setDisabled(false)
      alert("please make purchases")
    }

  }

  const totalAdd = () => {
    
    let products = []
    let total = 0
    for (let i = 0; i< props.data.length; i++){
   
        if (!p[i].quantity) p[i].quantity = 1
        if (!p[i].unitPrice) p[i].unitPrice = 0
        products.push(p[i])
      
    }
    
    products.map(p => {
      total += p.quantity * p.unitPrice
    })
    props.total(total)
  }

    useEffect(()=> {
      if (p) totalAdd()
    }, [p])

  useEffect(()=> {
  }, [props.data, purchaseList])

    return (
       <div style = {{width: "100%"}}>

          <div style={{display: "flex", width: "100%", height: "50px",
            display: "flex", justifyContent: "space-between", padding: "20px",
            background: "#EFF0F6", alignItems: "center"}}>
            {columns.map(c => (
             <p style={{margin: "0px", fontWeight: "bold",
           fontSize: "14px", flex: c == "Product Name" ? 1.5 : 
            c == "QuantityIn" || c == "Unit Price" || c == "Total" 
            || c == "Available" || c == "AvgCost" ? 1 : 0.3}}> {c}</p>
           ))}
          </div>

          <div style={{display: "flex", width: "100%",
        display: "flex", justifyContent: "start", padding: "15px",
        borderRadius: "0px 0px 10px 10px", background: "white",
        flexDirection: "column", gap: "30px"}}>
            {purchaseList.map((data, index) => {
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

export default PurchasesTable