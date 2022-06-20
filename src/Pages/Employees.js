import React, { useState, useEffect, useReducer } from "react";
import { Button } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import { FormControl, Select, MenuItem, Menu } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import AssignManyToClass from "../containers/EmplooyeeContainers/AssingManyToClass";
import { setEmployees } from "../redux/actions/employeesActions";
import EmployeesTable from "../containers/EmplooyeeContainers/EmployeesTable";
import RegisterEmployees from "../containers/EmplooyeeContainers/RegisterEmployees";
import EmployeeProfile from "../containers/EmplooyeeContainers/EmployeeProfile";

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
    if (status !== "All"){
      const response = await axios
      .get(`/api/v1/employees?status=${status}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
      
    dispatch(setEmployees(response.data.data.employees));
    } else {
      const response = await axios
      .get("/api/v1/employees")
      .catch((err) => {
        console.log("Err: ", err);
      });

    dispatch(setEmployees(response.data.data.employees));
    }

  };

  useEffect(() => {
    // if (students.length > 0) return
    fetchEmpoloyees(status);
  }, [ignored, status]);

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
  }

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
        {assignMany && <AssignManyToClass hideModal = {hideModal}
        employeesIds = {emplyeeIds}/>}
        <h2> {newEmployees ? "Create New Employees" : 
        showProfile ? "Employee Profile" : "Employees"}</h2>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#2F49D1",
            color: "white",
          }}
          onClick = {addEmployeeHandler}
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
 
          <FormControl style={{ padding: "0px", margin: "0px" }}>
          <Select
            style={{  height: "40px", color: "#B9B9B9",
            width: "150px", }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            onChange={statusHandler}
          >
            {statusArr.map((status, index) => (
              <MenuItem value={status} key={index}>
                {status}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
          {showCornerIcon && <BiDotsVerticalRounded style = {{
            fontSize: "24px", margin: "auto 0px",
            cursor: "pointer"
          }} onClick = {handleClick} />}
        </div>
      </div>}
      {!newEmployees && !showProfile && <EmployeesTable data={handler(employees)} 
      change = {changeHandler} selectEmpoloyees = {selectHandler}
      update = {updateHandler} showProfile = {showProfileHandler}/>}
      {newEmployees && <RegisterEmployees update = {update}
      empoloyee = {updatedEmployee} reset = {resetFomr}/>}
      {showProfile && <EmployeeProfile/>}

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
