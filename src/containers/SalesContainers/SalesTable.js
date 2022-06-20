import MaterialTable from "material-table";
import { Button, TextField } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {useSelector, useDispatch } from "react-redux";
import { FormControl, Select, MenuItem, Menu } from "@mui/material";
import { BiDotsHorizontalRounded } from "react-icons/bi"; 
import CloseIcon from '@mui/icons-material/Close';
import TableRows from "./TableRows";
import { CodeSharp } from "@material-ui/icons";


const SalesTable = (props) => {

  const activeUser = useSelector(state => state.activeUser.activeUser)
  const columns = ["Product Name", "Quantity", "Unit Price", "Total",
    "Actions"]

  const [p, setP] = useState([])

  const dataHandler = (d) => {
    // const pure = data.filter(data => data.item);
    // setData(arr => [...arr, d])
    // console.log(data)
  }

  const quantityFun = (number, quantity, item) => {
    for (let i = 0; i<= props.data.length; i++){
      if(number == i){
        setP({...p, [number]: { ...p[number], quantity: quantity, item: item}})
      }
    }
  }

  const unitPriceFun = (number, unitPrice, item) => {
    for (let i = 0; i<= props.data.length; i++){
      if(number == i){
        setP({...p, [number]: { ...p[number], unitPrice: unitPrice,
        item: item}})
      }
    }
  }

  // console.log(p)

  const postSales = async (data) => {
    const res = await axios.post(`api/v1/sales`, data).then(()=>{
      alert("Successfully Completed Order")
    }).catch(()=> {
      alert("Failed To Complete")
    })
  }

  const btnHandler = () => {

    const apiData = {}
    let products = []
    for (let i = 0; i< props.data.length; i++){
      products.push(p[i])
    }
    Object.assign(apiData, {products: products,
      usesr: activeUser._id, customer: props.customer,
    paymentType: props.paymentType});
    console.log(apiData)
    postSales(apiData)
  }

  useEffect(()=> {
    // console.log(props.data)
  }, [props.data])

    return (
       <div>

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
            {props?.data?.map((data, index) => (
            <TableRows value = {data} data = {(d) => dataHandler(d)}
             key = {index} number = {index}
             total = {(total)=>props.total(total)}
             quantityFun = {quantityFun} unitPriceFun = {unitPriceFun}/>
            ))}
          </div>
          <Button
          variant="contained"
          style={{
            backgroundColor: "#2F49D1",
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