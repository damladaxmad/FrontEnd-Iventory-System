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
import { constants } from "../../Helpers/constantsFile";
// import { CodeSharp } from "@material-ui/icons";


const PurchasesTable = (props) => {
  const dispatch = useDispatch()
  const activeUser = useSelector(state => state.activeUser.activeUser)
  const purchaseList = useSelector(state => state.purchaseList.purchaseList)
  
  const columns = ["Product Name", "Available", "QuantityIn", "Unit Price", 
  "SalePrice", "Total",
    "Actions"]

  const [force, setForce] = useState(1)
  const [disabled, setDisabled] = useState(false)
  const [cUnitPrice, setCunitPrice] = useState(0)

  const forceHandler = () => {
    setForce(state => state + 1)
  }
  useEffect(()=> {
  }, [force])

  const [p, setP] = useState({})

  const dataHandler = (currentUnitPrice) => {
    setCunitPrice(currentUnitPrice)
  }

  const quantityFun = (number, quantity, item) => {
    for (let i = 0; i<= props.data.length; i++){
      if(number == i){
        setP({...p, [number]: { ...p[number], quantity: parseInt(quantity) , item: item}})
      }
    }
  }

  const unitPriceFun = (number, unitPrice, currentUnitPrice, item) => {
    for (let i = 0; i<= props.data.length; i++){
      if(number == i){
        setP({...p, [number]: { ...p[number], 
          unitPrice: currentUnitPrice != 0 ? parseFloat((unitPrice + currentUnitPrice) / 2) 
          : parseFloat(unitPrice),
          currentUnitPrice: parseFloat(unitPrice), item: item}})
      }
    }
  }
  const salePriceFun = (number, salePrice, item) => {
    for (let i = 0; i<= props.data.length; i++){
      if(number == i){
        setP({...p, [number]: { ...p[number], salePrice: parseFloat(salePrice) , item: item}})

      }
    }
  }

  const postSales = async (data) => {
    const res = await axios.post(`${constants.baseUrl}/purchases`, data).then(()=>{
      alert("Successfully Completed Purchase")
      console.log(data)
      setDisabled(false)
      setP([])
      dispatch(setPurchaseList([]))
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
      if (!p[i].unitPrice) p[i].unitPrice = cUnitPrice
      products.push(p[i])
    }
    const apiData = {products: products,
      user: activeUser.userName, vendor: props.vendor,
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
    if (props.data.length){

      for (let i = 0; i< props.data.length; i++){
          
          if (!p[i].quantity) p[i].quantity = 1
          if (!p[i].currentUnitPrice) p[i].currentUnitPrice = cUnitPrice
          products.push(p[i])
        
      }
      products.map(p => {
        total += p.quantity * p.currentUnitPrice
      })
      props.total(total)
    }
    
    
  }
 
  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  useEffect(()=> {
    return () => {
      setP({})
    }
  }, [])


    useEffect(()=> {
     
      if (!isEmpty(p)) totalAdd()
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
            || c == "Available" || c == "SalePrice" ? 1 : 0.3}}> {c}</p>
           ))}
          </div>

          <div style={{display: "flex", width: "100%",
        display: "flex", justifyContent: "start", padding: "15px",
        borderRadius: "0px 0px 10px 10px", background: "white",
        flexDirection: "column", gap: "30px"}}>
            {purchaseList.map((data, index) => {
            return <TableRows value = {JSON.parse(data)} data = {dataHandler}
             key = {index} number = {index}
             total = {(total)=>props.total(total)}
             quantityFun = {quantityFun} unitPriceFun = {unitPriceFun}
             salePriceFun = {salePriceFun}
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