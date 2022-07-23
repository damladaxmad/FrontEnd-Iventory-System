import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {Typography, Button, MenuItem, Menu, Avatar} from "@material-ui/core"
import ResetPopUp from "./ResetPopUp";
import axios from "axios";
import { useSelector } from "react-redux";
import swal from "sweetalert";

const UsersTable = (props) => {

  const materialOptions = {
    showTitle: false,
    exportButton: true,
    sorting: false,
    showTextRowsSelected: false,
    toolbar: false,
    pageSizeOptions: [2, 5, 8, 10, 20, 25, 50, 100],
    pageSize: 4,
    draggable: false,
    actionsColumnIndex: -1,
    headerStyle: { background: "#EFF0F6", fontSize: "13px", },
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [show, setShow] = useState(false)
  const [user, setUser] = useState('')
  const activeUser = useSelector(state => state.activeUser.activeUser)

  const columns = [
   
    { title: "Employee Name", field: "name", width: "4%" },
    { title: "Username", field: "username" },
    { title: "User Password", field: "Password" },
  ];

  const showModal = () =>{
    setShow(true)
    handleClose()
  }

  const hideModal = () =>{
    setShow(false)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, user) => {
    setAnchorEl(event.currentTarget);
    setUser(user)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const showSweetAlert = () => {
    setAnchorEl(null);
    swal({
      title: "Delete User!",
      text: `Are you sure to delete ${user.name}?`,
      icon: "warning",
      buttons: {
        cancel : 'No',
        confirm : {text:'Yes',className:'sweet-warning'},
    }

    }).then((response) => {
      if (response) {
        axios.delete(`http://127.0.0.1:80/api/v1/users/${user._id}`).then(()=> {
          swal({text: `You have successfully deleted ${user.name}`,
          icon:"success", timer: "2000"})    
          props.change()
        }).catch((err) => {
          swal({text: err.response.data.message,
      icon:"error", timer: "2000"})
        })
        handleClose()
      }
    })
  }
  const deleteUser = () => {
    showSweetAlert()
    handleClose()
    // props.change()
  };

  let state = props.state

  return (
    <div style={{ width: "98%", margin: "auto" }}>
 {show && <ResetPopUp hideModal = {hideModal} user = {user}
 change = {()=> props.change()}
 />}
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          style: {
           marginRight: "120px"
          }
         }}
        style = {{}}
      >
        <MenuItem onClick={() => {
          if (activeUser.privillages.includes('Reset User'))
          showModal()
          else alert("You have no access")
          }}>Reset User</MenuItem>
        <MenuItem onClick={() => {
          if (activeUser.privillages.includes('Delete User'))
          deleteUser()
          else alert("You have no access")
          }}>Delete User</MenuItem>

      </Menu>


      <MaterialTable
        columns={columns}
        data={props.data}
        options={materialOptions}
        // onSelectionChange={(rows) => selectionHandler(rows)}
        localization={{
          body: {
              emptyDataSourceMessage: (
                  state
              ),
          },
      }}
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

export default UsersTable;
