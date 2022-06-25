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


const SalesTable = (props) => {
  const dispatch = useDispatch()
  const activeUser = useSelector(state => state.activeUser.activeUser)
  const orderList = useSelector(state => state.orderList.orderList)
  const columns = ["Product Name", "Quantity", "Unit Price", "Total",
    "Actions"]

  const [force, setForce] = useState(1)

  const forceHandler = () => {
    setForce(state => state + 1)
  }
  useEffect(()=> {
  }, [force])

  const [p, setP] = useState([])

  const dataHandler = (d) => {
    // const pure = data.filter(data => data.item);
    // setData(arr => [...arr, d])
    // console.log(data)
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

  // console.log(p)

  const postSales = async (data) => {
    const res = await axios.post(`api/v1/sales`, data).then(()=>{
      alert("Successfully Completed Order")
      dispatch(setOrderList([]))
    }).catch(()=> {
      alert("Failed To Complete")
    })
  }

  const btnHandler = () => {

    let products = []
    for (let i = 0; i< props.data.length; i++){
      if (!p[i].quantity) p[i].quantity = 1
      if (!p[i].price) p[i].price = 0
      products.push(p[i])
    }
    const apiData = {products: products,
      user: activeUser.name, customer: props.customer,
      paymentType: props.paymentType};
    if (apiData.products.length > 0 ) {
      postSales(apiData)
    }
    if (apiData.products.length < 1) {
      alert("please make orders list")
    }

  }

  useEffect(()=> {
    // console.log(props.data)
  }, [props.data, orderList])

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