import React, { useState, useEffect, useReducer } from "react";
import { Button } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import { FormControl, Select, MenuItem, Menu } from "@mui/material";
import TeachersTable from "../containers/ProductsContainers/StudentsTable";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import RegisterTeachers from "../containers/ProductsContainers/RegisterStudents";
import TeacherProfile from "../containers/ProductsContainers/StudentProfile";
import AssignManyToClass from "../containers/ProductsContainers/AssingManyToClass";
import { setProducts } from "../redux/actions/productsActions";

const Products = () => {
  const [newTeachers, setNewTeachers] = useState(false)
  const [buttonName, setButtonName] = useState('Add New Teachers')
  const [update, setUpdate] = useState(false)
  const [showCornerIcon, setShowCornerIcon] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [updatedTeacher, setUpdatedTeacher] = useState(null)
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [showProfile, setShowProfile] = useState(false)
  const [assignMany, setAssignMany] = useState(false)
  const [teacherIds, setTeachersIds] = useState('')

  

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
  const products = useSelector((state) => state.products.products);
  const statusArr = ["All", "Active", "Inactive"]
  const [status, setStatus] = useState(statusArr[0]);
  const [query, setQuery] = useState("");


  const statusHandler = (e) => {
    setStatus(e.target.value)
  }

  const addStudentHandler = () => {
    setQuery('')
    if (buttonName == "Add New Teachers"){
      setNewTeachers(true)
      setButtonName("Go To Teachers")
      setShowProfile(false)
      return
    } else if (buttonName == "Go To Teachers") {
      setShowProfile(false)
      setNewTeachers(false)
      setButtonName("Add New Teachers") 
      setUpdate(false)
    }
   
    
  }

  const handler = (data) => { 
 
    if (data.length > 0) {
      return data.filter(
        (std) =>
        std.name.toLowerCase().includes(query) ||
        std.contact.toLowerCase().includes(query)
      );
    } else {
      return
    }  
  };

  const fetchProducts = async (status) => {
      const response = await axios
      .get("/api/v1/products")
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(setProducts(response.data.data.products));   
  };

  useEffect(() => {
    // if (students.length > 0) return
    fetchProducts();
  }, [ignored]);

  let teachersIds = '';
  const selectHandler = (data) => {
    data.map((d)=> {
        teachersIds += d._id
        teachersIds += ','
    })
    const slicedTeachersIds = teachersIds.slice(0, -1)
    setTeachersIds(slicedTeachersIds)

    setShowCornerIcon(true)
    if (data.length < 1) {
      setShowCornerIcon(false)
    }
  }

  const updateHandler = (teacher) => {
    setNewTeachers(true)
    setButtonName("Go To Teachers")
    setUpdate(true)
    setUpdatedTeacher(teacher)
  }

  const resetFomr = () => {
    setUpdate(false)
  }

  const showProfileHandler = () => {
    setShowProfile(true)
    setButtonName("Go To Teachers")
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
        teachersIds = {teacherIds}/>}
        <h2> {newTeachers ? "Create New Teachers" : 
        showProfile ? "Student Profile" : "Teachers"}</h2>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#2F49D1",
            color: "white",
          }}
          onClick = {addStudentHandler}
          startIcon={
            newTeachers || showProfile ? <BiArrowBack
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
      {!newTeachers && !showProfile &&
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
      {!newTeachers && !showProfile && <TeachersTable data={handler(products)} 
      change = {changeHandler} selectTeachers = {selectHandler}
      update = {updateHandler} showProfile = {showProfileHandler}/>}
      {newTeachers && <RegisterTeachers update = {update}
      teacher = {updatedTeacher} reset = {resetFomr}/>}
      {showProfile && <TeacherProfile/>}

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
        <MenuItem >Delete Teachers</MenuItem>
      </Menu>
    </div>
  );
};

export default Products;
