import React, { useState, useEffect, useReducer } from "react";
import { Button } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import {Select} from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { setEmployees } from "../redux/actions/employeesActions";
import EmployeesTable from "../containers/EmplooyeeContainers/EmployeesTable";
import RegisterEmployees from "../containers/EmplooyeeContainers/RegisterEmployees";

const Emplooyees = () => {
  const [newEmployees, setNewEmployees] = useState(false)
  const [buttonName, setButtonName] = useState('Add New Employees')
  const [update, setUpdate] = useState(false)
  const [showCornerIcon, setShowCornerIcon] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [updatedEmployee, setUpdatedEmployee] = useState(null)
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [showProfile, setShowProfile] = useState(false)
  const [assignMany, setAssignMany] = useState(false)
  const [emplyeeIds, setEmployeesIds] = useState('')
  const [state, setState] = useState("")
  const activeUser = useSelector(state => state.activeUser.activeUser)
  

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
  const employees = useSelector((state) => state.employees.employees);
  const statusArr = ["All", "Active", "Inactive"]
  const [status, setStatus] = useState(statusArr[0]);
  const [query, setQuery] = useState("");
  const [force, setForce] = useState(1)

  const statusHandler = (e) => {
    setStatus(e.target.value)
  }

  const addEmployeeHandler = () => {
    setQuery('')
    if (buttonName == "Add New Employees"){
      setNewEmployees(true)
      setButtonName("Go To Employees")
      setShowProfile(false)
      return
    } else if (buttonName == "Go To Employees") {
      setShowProfile(false)
      setNewEmployees(false)
      setButtonName("Add New Employees") 
      setUpdate(false)
    }
   
    
  }

  const handler = (data) => { 
 
    if (data.length > 0) {
      return data.filter(
        (std) =>
        std.name.toLowerCase().includes(query) ||
        std.email.toLowerCase().includes(query)
      );
    } else {
      return
    }  
  };

  const fetchEmpoloyees = async (status) => {

      const response = await axios
      .get("http://127.0.0.1:80/api/v1/employees")
      .catch((err) => {
        alert(err.message);
      });

    dispatch(setEmployees(response.data.data.employees)); 
    if (response.data.data.employees?.length < 1)
    setState("No employees to display!")

  };

  let employeesIds = '';
  const selectHandler = (data) => {
    data.map((d)=> {
      employeesIds += d._id
      employeesIds += ','
    })
    const slicedEmployeesIds = employeesIds.slice(0, -1)
    setEmployeesIds(slicedEmployeesIds)

    setShowCornerIcon(true)
    if (data.length < 1) {
      setShowCornerIcon(false)
    }
  }

  const updateHandler = (employee) => {
    setNewEmployees(true)
    setButtonName("Go To Employees")
    setUpdate(true)
    setUpdatedEmployee(employee)
  }

  const resetFomr = () => {
    setUpdate(false)
    setForce(state => state + 1)
  }

  useEffect(()=> {
    setState("Loading...")
    fetchEmpoloyees()
  }, [force, ignored])

    useEffect(()=> {
    if (query != '') {
      setState("No matching employees!")
    }
  }, [query])

  const showProfileHandler = () => {
    setShowProfile(true)
    setButtonName("Go To Empoloyees")
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "95%",
          margin: "auto",
        }}
      >
   
        <h2> {newEmployees ? "Create New Employees" : 
        showProfile ? "Employee Profile" : "Employees"}</h2>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#2F49D1",
            color: "white",
          }}
          onClick = {() => {
            if (activeUser.privillages.includes('Add New Employees'))
            addEmployeeHandler()
            else alert("You have no access!")
          }}
          startIcon={
            newEmployees || showProfile ? <BiArrowBack
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
      </div>
      {!newEmployees && !showProfile &&
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
      {!newEmployees && !showProfile && <EmployeesTable data={handler(employees)} 
      change = {changeHandler} selectEmpoloyees = {selectHandler}
      update = {updateHandler} showProfile = {showProfileHandler}
      state = {state}/>}
      {newEmployees && <RegisterEmployees update = {update}
      empoloyee = {updatedEmployee} reset = {resetFomr}/>}

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
        <MenuItem >Delete Employees</MenuItem>
      </Menu>
    </div>
  );
};

export default Emplooyees;
