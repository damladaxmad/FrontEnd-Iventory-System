import React, { useState, useEffect, useReducer } from "react"
import { FormControl, MenuItem, Menu, TextField, Checkbox, FormControlLabel, FormGroup} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "@mui/material";
import axios from "axios";
import { setUsers } from "../../redux/actions/usersActions";
import useFetch from "../../funcrions/DataFetchers";
import Table from "../../utils/Table";
import { setSales } from "../../redux/actions/salesActions";
import { setPurchases } from "../../redux/actions/purchasesActions";
import moment from "moment"
import { setCancelledSales } from "../../redux/actions/cancelledSalesActions";
import { setCancelledPurchases } from "../../redux/actions/cancelledPurchasesActions";

const TranTable = (props) => {

  const [checked, setChecked] = useState(false)
  const dispatch = useDispatch();
  const [state, setState] = useState('')
  const [startDate, setStartDate] = useState(moment(new Date()).format("MM-DD-YYYY"))
  const [endDate, setEndDate] = useState(moment(new Date()).format("MM-DD-YYYY"))

  const columns = [
    { title: "User", field: "user"},
    { title: "Invoice", field: "invoice" },
    { title: "Type", field: "paymentType" },
    { title: "Date", field: "date", render: (data) => <p>
        {moment(data.date).format("MM-DD-YYYY")}
    </p> },
    // { title: "Type", field: props.type == "Sales" ? "customer" : "vendor" },
    { title: "Status", field: "status", render: (data) => <p style={{
      color: data.status !== "open" ? "red" : null}}>
      {data.status}
    </p> },
    { title: "Total", field: "total" },
  ]

  const parentDivStyle = { display: "flex", alignItems: "center",
    justifyContent: "space-between",  gap: "0px", padding: "20px",
    background: "white", width: "95%", margin: "auto",
    marginTop: "20px", borderRadius: "8px 8px 0px 0px",
  }

  const searchStyle = { width: "400px", height: "40px",
    padding: "10px", fontSize: "16px", borderRadius: "8px",
    background: "#EFF0F6", border: "none",
  }

  const selectStyle = {  height: "40px", color: "#B9B9B9",
  width: "150px"}

  const statusArr = ["All", "Active", "Inactive"]
    const [status, setStatus] = useState(statusArr[0]);
    const [query, setQuery] = useState("");
    const sales = useSelector((state) => state.sales.sales);
    const purchases = useSelector((state) => state.purchases.purchases);
    const cancelledSales = useSelector((state) => state.cancelledSales.cancelledSales);
    const cancelledPurchases = useSelector((state) => state.cancelledPurchases.cancelledPurchases);
    const [force, setForce] = useState(1)

    const checkHanlder = () => {
      if (!checked) setStartDate(moment("01/01/2022").format("MM-DD-YYYY"))
      setChecked(!checked)
    }

    const change = () => {
      setForce(state => state + 1)
    }

    const statusHandler = (e) => {
    setStatus(e.target.value)
    }

  dispatch(setSales(useFetch(`sales/bydate/${startDate}/${endDate}`, force, "sales")))
  dispatch(setPurchases(useFetch(`purchases/bydate/${startDate}/${endDate}`, force, "purchases")))
  dispatch(setCancelledSales(useFetch(`sales/canceled/${startDate}/${endDate}`, force, "sales")))
  dispatch(setCancelledPurchases(useFetch(`purchases/canceled/${startDate}/${endDate}`, force, "purchases")))

  const handler = (data) => { 
    if (data?.length > 0) {
      return data.filter(
        (std) =>
        std.invoice.toString().toLowerCase().includes(query)
      );
    } else {
      return
    }  
  };

  // useEffect(()=> {
  //   setState('Loading...')
  // }, [force])

  useEffect(()=> {
    if (!handler(sales) || !handler(purchases))
    setState('No transactions.')
  }, [force])

  useEffect(()=> {

  }, [props.type])

  useEffect(()=> {
    if (query != '') {
      setState("No matching transactions!")
    }
  }, [query])

   
  return (
<>
    <div
    style={parentDivStyle}
  >
    <input
      type="text"
      placeholder="Search"
      style={searchStyle}
      onChange={(e) => setQuery(e.target.value)}
    />

          <TextField
            size="small"
            type="date"
            label = "Start Date"
            value= {moment(new Date(startDate)).format("YYYY-MM-DD")}
            style={{ width: "20%" }}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            size="small"
            type="date"
            label = "End Date"
            value= {moment(new Date(endDate)).format("YYYY-MM-DD")}
            placeholder="Search"
            style={{ width: "20%" }}
            onChange={(e) => setEndDate(e.target.value)}
          />

<FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            style={{ padding: "5px 15px" }}
            color="primary"
            checked={checked}
            onChange={() => checkHanlder()}
          />
        }
        label="All"
      />
    </FormGroup>
   

  </div>
  
      {props.type == "Sales" ? <Table data = {handler(sales)} 
      change = {change} state =  {state} columns = {columns}
      url = "sales" name = "Sale"/> :
      props.type == "Cancelled Sales" ? <Table data = {handler(cancelledSales)} 
      change = {change} state =  {state} columns = {columns}
      url = "sales" name = "Cancelled Sales"/> 
      :
      props.type == "Cancelled Purchases" ? <Table data = {handler(cancelledPurchases)} 
      change = {change} state =  {state} columns = {columns}
      url = "purchases" name = "Cancelled Purchases"/> 
      :
      
      <Table data = {handler(purchases)} 
      change = {change} state =  {state} columns = {columns}
      url = "purchases" name = "Purchase"/> 
      }
      
      </>
  )
}

  export default TranTable