import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {Typography, Button, MenuItem, Menu, Avatar} from "@material-ui/core"
import PopupForm from "./AssignPopUp";
import axios from "axios";
import profile from "../../assets/images/tablePic.png"
import { useSelector } from "react-redux";
import moment from "moment";
import { constants } from "../../Helpers/constantsFile";

const CustomersTable = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [show, setShow] = useState(false)
  const [customer, setCustomer] = useState('')
  const activeUser = useSelector(state => state.activeUser.activeUser)

  const columns = [
   
    { title: "Customer Name", field: "name" , width: "8%",},
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

    { title: "Balance", field: "balance", render: (data) =>
    <p>{data.balance < 0 ? `-${constants.moneySign}${data.balance*-1}` : `${constants.moneySign}${data.balance}`}</p>
  },


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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, customer) => {
    setAnchorEl(event.currentTarget);
    setCustomer(customer)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteCustomer = (id) => {
    axios.delete(`${constants.baseUrl}/customers/${customer._id}`).then(()=>{
      alert("Succefully Deleted").catch((err)=> {
        alert(err.response.data.message);
      })
    })
    handleClose()
    props.change()
  };

  const updateCustomer = () => {
    props.update(customer)
    handleClose()
  }

  const selectionHandler = (data) => {
    props.selectStudents(data)
  }

  const showProfile = (type) => {
    props.showProfile(customer, type)
  }

  let state = props.state

  if (props.data){
  return (
    <div style={{ width: "95%", margin: "auto" }}>
 {show && <PopupForm hideModal = {hideModal} customer = {customer}
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
          if (activeUser.privillages.includes("Update Customer"))
          updateCustomer()
          else alert("You have no access!")
          }}>Update Customer</MenuItem>
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
          pageSize: props.data.length < 100 ? props.data.length < 8 ? 8 : props.data.length : 100,
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
} else {
  return <div style={{width: "95%", margin: "60px auto",
  display: "flex", justifyContent: "center", alignItems: "center"}}>

    <p>Loading...</p>
  </div>
}
};

export default CustomersTable;
