import React, { useState, useEffect, useReducer } from "react";
import { Button } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import {Select} from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { setVendors } from "../redux/actions/vendorsActions";
import { constants } from "../Helpers/constantsFile";
import Table from "../utils/Table";
import moment from "moment";
import Register from "../utils/Register";
import Transactions from "../utils/Transactions";
import CustomerVendorSales from "../utils/CustomerVendorSales";
import useFetch from "../funcrions/DataFetchers";

const Vendors = (props) => {
  const [newVendors, setNewVendors] = useState(false)
  const [buttonName, setButtonName] = useState('Add New Vendors')
  const [update, setUpdate] = useState(false)
  const [showCornerIcon, setShowCornerIcon] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [updatedVendor, setUpdatedVendor] = useState(null)
 
  const [showProfile, setShowProfile] = useState(false)
  const [assignMany, setAssignMany] = useState(false)
  const [VendorIds, setVendorsIds] = useState('')
  const [vendorTransactions, setVendorTransactions] = useState()
  const [state, setState] = useState('')
  const activeUser = useSelector(state => state.activeUser.activeUser)
  const [sale, setSale] = useState(false)
  const dispatch = useDispatch()
  const vendors = useSelector((state) => state.vendors.vendors);
  const statusArr = ["All", "Pending", "Late", "Clear"]
  const [status, setStatus] = useState(statusArr[0]);
  const [query, setQuery] = useState("");
  const [force, setForce] = useState(1)

  const columns = [
   
    { title: "Vendor Name", field: "name" , width: "8%",},
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
    // { title: "Deadline", field: "deadline" },   
    { title: "Balance", field: "balance", render: (data) =>
    <p>{data.balance < 0 ? `-${constants.moneySign}${data.balance*-1}` : `${constants.moneySign}${data.balance}`}</p>},
    
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, vendor) => {
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

  const addVendorHandler = () => {
    setQuery('')
    if (buttonName == "Add New Vendors"){
      setNewVendors(true)
      setButtonName("Go To Vendors")
      setShowProfile(false)
      setSale(false)
      return
    } else if (buttonName == "Go To Vendors") {
      setShowProfile(false)
      setSale(false)
      setNewVendors(false)
      setButtonName("Add New Vendors") 
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

  dispatch(setVendors(useFetch("vendors/vendors-with-transactions", force, "vendors")))

  // const fetchVendors = async (status) => {
  //   if (status !== "All"){
  //     const response = await axios
  //     .get(`${constants.baseUrl}/vendors?status=${status}`)
  //     .catch((err) => {
  //       alert(err.response.data.message);
  //     });
  //   dispatch(setVendors(response.data.data.vendors));
  //   if (response.data.data.products.length < 1)
  //   setState("No vendors to display!")
  //   } else {
  //     const response = await axios
  //     .get(`${constants.baseUrl}/vendors`)
  //     .catch((err) => {
  //       alert(err.response.data.message);
  //     });
  //   dispatch(setVendors(response.data.data.vendors));
  //   if (response.data.data.customers?.length < 1)
  //   setState("No vendors to display!")
  // }
  

  // };

  let vendorsIds = '';
  const selectHandler = (data) => {
    data.map((d)=> {
      vendorsIds += d._id
      vendorsIds += ','
    })
    const slicedVendorsIds = vendorsIds.slice(0, -1)
    setVendorsIds(slicedVendorsIds)

    setShowCornerIcon(true)
    if (data.length < 1) {
      setShowCornerIcon(false)
    }
  }

  const updateHandler = (vendor) => {
    setNewVendors(true)
    setButtonName("Go To Vendors")
    setUpdate(true)
    setUpdatedVendor(vendor)
  }

  const resetFomr = () => {
    setUpdate(false)
    setForce(state => state + 1)
  }
  

  useEffect(()=> {
    setState("Loading...")
    // fetchVendors(status)
  }, [force])

  useEffect(()=> {
    if (query != '') {
      setState("No matching vendors!")
    }
  }, [query])

  const showTransactions = (data, type) => {
    if (type == "Sale") {
      setSale(true)
      setShowProfile(false)
      setButtonName("Go To Vendors")
      setVendorTransactions(data)
    }
    if (type == "Transaction") {
      setSale(false)
      setShowProfile(true)
      setButtonName("Go To Vendors")
      setVendorTransactions(data)
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
      
        <h2> {newVendors ? "Create New Vendors" : 
        showProfile ? "Vendor Transactions" : "Vendors"}</h2>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#2F49D1",
            color: "white",
          }}
          onClick = {() => {
            if (activeUser.privillages.includes("Add New Vendors")){
              addVendorHandler()
            } else {
              alert("You have no access")
            }
          }}
          startIcon={
            newVendors || showProfile || sale ? <BiArrowBack
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
      { !showProfile && !sale &&
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
      
      { !showProfile && !sale && <Table data={handler(vendors)} 
      change = {changeHandler} selectVendors = {selectHandler}
      update = {updateHandler} showTransactions = {showTransactions}
      state = {state} url = "vendors" name = "Vendor"
      columns = {columns}/>}
      {newVendors && <Register update = {update}
      instance = {updatedVendor} reset = {resetFomr}
      hideModal = {()=> {
        setUpdate(false)
        setNewVendors(false)
        setButtonName("Add New Vendors")
      }}
      name = "Vendor" url = "vendors" fields = {fields}
      />}
      {showProfile && <Transactions instance = {vendorTransactions}
      name = "Vendor"/>}
      {sale && <CustomerVendorSales instance = {vendorTransactions}
      name = "Vendor" type = "purchase"/>}

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
        <MenuItem >Delete Vendor</MenuItem>
      </Menu>
    </div>
  );
};

export default Vendors;