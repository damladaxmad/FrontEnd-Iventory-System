import React, { useState, useEffect, useReducer } from "react";
import { Button } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import {Select} from "@mui/material"
import VendorsTable from "../containers/VendorContainers/VendorsTable";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import RegisterVendors from "../containers/VendorContainers/RegisterVendors";
import VendorSales from "../containers/VendorContainers/VendorSales";
import VendorDetails from "../containers/VendorContainers/VendorDetails";
import { setVendors } from "../redux/actions/vendorsActions";
import { constants } from "../Helpers/constantsFile";

const Vendors = (props) => {
  const [newVendors, setNewVendors] = useState(false)
  const [buttonName, setButtonName] = useState('Add New Vendors')
  const [update, setUpdate] = useState(false)
  const [showCornerIcon, setShowCornerIcon] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [updatedVendor, setUpdatedVendor] = useState(null)
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [showProfile, setShowProfile] = useState(false)
  const [assignMany, setAssignMany] = useState(false)
  const [VendorIds, setVendorsIds] = useState('')
  const [vendorTransactions, setVendorTransactions] = useState()
  const [state, setState] = useState('')
  const activeUser = useSelector(state => state.activeUser.activeUser)
  const [sale, setSale] = useState(false)

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
    forceUpdate()
  }

  const dispatch = useDispatch()
  const vendors = useSelector((state) => state.vendors.vendors);
  const statusArr = ["All", "Pending", "Late", "Clear"]
  const [status, setStatus] = useState(statusArr[0]);
  const [query, setQuery] = useState("");
  const [force, setForce] = useState(1)

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

  const fetchVendors = async (status) => {
    if (status !== "All"){
      const response = await axios
      .get(`${constants.baseUrl}/vendors?status=${status}`)
      .catch((err) => {
        alert(err.response.data.message);
      });
    dispatch(setVendors(response.data.data.vendors));
    if (response.data.data.products.length < 1)
    setState("No vendors to display!")
    } else {
      const response = await axios
      .get(`${constants.baseUrl}/vendors`)
      .catch((err) => {
        alert(err.response.data.message);
      });
    dispatch(setVendors(response.data.data.vendors));
    if (response.data.data.customers?.length < 1)
    setState("No vendors to display!")
  }
  

  };

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
    fetchVendors(status)
  }, [force, ignored])

  useEffect(()=> {
    if (query != '') {
      setState("No matching vendors!")
    }
  }, [query])

  const showProfileHandler = (data, type) => {
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
        {/* {assignMany && <AssignManyToClass hideModal = {hideModal}
        studentsIds = {studentIds}/>} */}
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
      {!newVendors && !showProfile && !sale &&
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
      {!newVendors && !showProfile && !sale && <VendorsTable data={handler(vendors)} 
      change = {changeHandler} selectVendors = {selectHandler}
      update = {updateHandler} showProfile = {showProfileHandler}
      state = {state} />}
      {newVendors && <RegisterVendors update = {update}
      vendor = {updatedVendor} reset = {resetFomr}/>}
      {showProfile && <VendorSales vendor = {vendorTransactions}/>}
      {sale && <VendorDetails vendor = {vendorTransactions}/>}

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