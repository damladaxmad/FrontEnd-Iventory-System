import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {Typography, Button, MenuItem, Menu, Avatar} from "@material-ui/core"
import PopupForm from "./AssignPopUp";
import axios from "axios";
import profile from "../../assets/images/tablePic.png"
import { useSelector } from "react-redux";
import moment from "moment";

const VendorsTable = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [show, setShow] = useState(false)
  const [vendor, setVendor] = useState('')
  const activeUser = useSelector(state => state.activeUser.activeUser)

  const columns = [
   
    { title: "Vendor Name", field: "name" , width: "8%",},
    { title: "Phone", field: "phone" },
    {
      title: "Deadline",
      field: "date",
      render: (data) => {
        const formatted = moment(data.deadline).format("DD/MM/YYYY");
        return <p>{formatted}</p>;
      },
      
    },
    // { title: "Deadline", field: "deadline" },   
    { title: "Balance", field: "balance", render: (data)=> <p>R{data.balance}</p> },
    { title: "Stutus", field: "status", render: (row)=> <span
    style={{color: row.status == "Late" ? "#FFAC32" 
    : row.status == "Clear" ? "#65a765" : "#5887FF"}}>
      {row.status}
    </span>},

    
  ];

  const showModal = () =>{
    setShow(true)
    handleClose()
  }

  const hideModal = () =>{
    setShow(false)
    props.change()
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, vendor) => {
    setAnchorEl(event.currentTarget);
    setVendor(vendor)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteVendor = (id) => {
    axios.delete(`http://127.0.0.1:80/api/v1/vendors/${vendor._id}`).then(()=>{
      alert("Succefully Deleted").catch((err)=> {
        alert(err.response.data.message);
      })
    })
    handleClose()
    props.change()
  };

  const updateVendor = () => {
    props.update(vendor)
  }

  const selectionHandler = (data) => {
    props.selectStudents(data)
  }

  const showProfile = (type) => {
    props.showProfile(vendor, type)
  }

  let state = props.state


  return (
    <div style={{ width: "95%", margin: "auto" }}>
 {show && <PopupForm hideModal = {hideModal} vendor = {vendor}
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
          if (activeUser.privillages.includes("Payment"))
          showModal()
          else alert("You have no access!")
          }}>Payment</MenuItem>
        <MenuItem onClick={() => {
          if (activeUser.privillages.includes("Update Vendor"))
          updateVendor()
          else alert("You have no access!")
          }}>Update Vendor</MenuItem>
        <MenuItem onClick={() => {
          if (activeUser.privillages.includes("View Transactions"))
          showProfile('Transaction')
          else alert("You have no access!")
          }}>View Transactions</MenuItem>
        <MenuItem onClick={() => {
          if (activeUser.privillages.includes("View Sales"))
          showProfile("Sale")
          else alert("You have no access!")
          }}>View Sales</MenuItem>
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
            tooltip: "Vendor Actions",
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

export default VendorsTable;
