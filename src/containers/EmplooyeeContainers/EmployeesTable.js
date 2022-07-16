import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {Typography, Button, MenuItem, Menu, Avatar} from "@material-ui/core"
import PopupForm from "./AssignPopUp";
import axios from "axios";
import profile from "../../assets/images/tablePic.png"
import { useSelector } from "react-redux";

const EmployeesTable = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [show, setShow] = useState(false)
  const [employee, setEmployee] = useState('')
  const activeUser = useSelector(state => state.activeUser.activeUser)

  const columns = [
    { title: "ID", field: "employeeId",},
    { title: "Full Name", field: "name", width: "4%"},
    { title: "Sex", field: "sex" },
    { title: "Email Address", field: "email" },
    { title: "Employee Role", field: "role" },
    { title: "Salary", field: "salary", render: (row)=> <p>
      R{row.salary}
    </p> }
    
  ];

  const showModal = () =>{
    setShow(true)
    handleClose()
  }

  const hideModal = () =>{
    setShow(false)
    props.change()
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, employee) => {
    setAnchorEl(event.currentTarget);
    setEmployee(employee)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteEmployee = () => {
    axios.delete(`http://127.0.0.1:80/api/v1/employees/${employee._id}`).then(()=> {
      alert("Successfully deleted")
    }).catch((err) => {
      alert(err.response.data.message);
    })
    handleClose()
    props.change()
  };

  const updateEmployee = () => {
    props.update(employee)
  }

  const selectionHandler = (data) => {
    props.selectTeachers(data)
  }

  const showProfile = () => {
    props.showProfile()
  }

  let state = props.state


  return (
    <div style={{ width: "95%", margin: "auto" }}>
 {show && <PopupForm hideModal = {hideModal} employee = {employee}
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
        <MenuItem onClick={() => {
          if (activeUser.privillages.includes('Give User'))
          showModal()
          else alert("You have no access")
          }}>Give User</MenuItem>
        <MenuItem onClick={()=> {
          if (activeUser.privillages.includes('Delete Employee'))
          deleteEmployee()
          else alert("You have no access!")
          }}>Delete Emplooyee</MenuItem>
        <MenuItem onClick={()=> {
          if (activeUser.privillages.includes('Update Employee'))
          updateEmployee()
          else alert("You have no access!")
          }}>Update Emplooyee</MenuItem>
      </Menu>
      <MaterialTable
        columns={columns}
        data={props.data}
        localization={{
          body: {
              emptyDataSourceMessage: (
                  state
              ),
          },
      }}
        options={{
          rowStyle: {},
          showTitle: false,
          exportButton: true,
          sorting: false,
          showTextRowsSelected: false,
          toolbar: false,
          pageSizeOptions: [2, 5, 8, 10, 20, 25, 50, 100],
          pageSize: 5,
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

export default EmployeesTable;
