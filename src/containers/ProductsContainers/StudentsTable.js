import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {Typography, Button, MenuItem, Menu, Avatar} from "@mui/material"
import PopupForm from "./AssignPopUp";
import axios from "axios";
import profile from "../../assets/images/tablePic.png"

const StudentsTable = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [show, setShow] = useState(false)
  const [student, setStudent] = useState('')

  const columns = [
   
    { title: "Product Name", field: "name" , width: "8%",},
    { title: "Category", field: "category" ,},
    { title: "Unit Measurment", field: "unitMeasurment" ,},
    { title: "Unit Price", field: "unitPrice"},
    { title: "Sale Price", field: "salePrice"},
    { title: "Quantity", field: "quantity"},
    
  ];

  const showModal = () =>{
    setShow(true)
    handleClose()
  }

  const hideModal = () =>{
    setShow(false)
    props.change()
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, student) => {
    setAnchorEl(event.currentTarget);
    setStudent(student)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteStudent = (id) => {
    axios.delete(`/api/v1/students/${student._id}`)
    handleClose()
    props.change()
  };

  const updateStudent = () => {
    props.update(student)
  }

  const selectionHandler = (data) => {
    props.selectStudents(data)
  }

  const showProfile = () => {
    props.showProfile()
  }


  return (
    <div style={{ width: "95%", margin: "auto" }}>
 {show && <PopupForm hideModal = {hideModal} student = {student}
 />}
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        style = {{}}
      >
        <MenuItem onClick={showModal}>Assign to class</MenuItem>
        <MenuItem onClick={deleteStudent}>Delete Student</MenuItem>
        <MenuItem onClick={updateStudent}>Update Student</MenuItem>
        <MenuItem onClick={showProfile}>Student Profile</MenuItem>
      </Menu>
      <MaterialTable
        columns={columns}
        data={props.data}
        options={{
          rowStyle: {},
          showTitle: false,
          selection: true,
          exportButton: true,
          sorting: false,
          showTextRowsSelected: false,
          toolbar: false,
          pageSizeOptions: [2, 5, 8, 10, 20, 25, 50, 100],
          pageSize: 8,
          draggable: false,
          // rowStyle: {
          //   overflowWrap: 'break-word'
          // },
          actionsColumnIndex: -1,
          headerStyle: { background: "#EFF0F6", fontSize: "13px", },
        }}
        onSelectionChange={(rows) => selectionHandler(rows)}
        actions={[
          {
            icon: () => <BiDotsHorizontalRounded 
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
           />,
            tooltip: "Save User",
            onClick: (event, rowData) => {
              handleClick(event, rowData)
            },
            position: "row",
          },
        ]}
        style={{ borderRadius: "10px", boxShadow: "none" }}
      />
    </div>
  );
};

export default StudentsTable;
