import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Typography, Button, MenuItem, Menu, Avatar } from "@material-ui/core";
import axios from "axios";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { constants } from "../Helpers/constantsFile";
import { deleteFunction } from "../funcrions/deleteStuff";
import CustomerAndVendorPayment from "../containers/CustomerContainers/CustomerAndVendorPayment";
import ResetUser from "../containers/AdminstrationContainers/UsersContainer/ResetUser";
import GiveUser from "../containers/EmplooyeeContainers/GiveUser";

const Table = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [show, setShow] = useState(false);
  const [userShow, setUserShow] = useState(false);
  const [cVModal, setCVmodal] = useState(false);
  const [instance, setInstance] = useState("");
  const activeUser = useSelector((state) => state.activeUser.activeUser);

  const columns = props.columns;

  const showModal = () => {
    setShow(true);
    handleClose();
  };

  const showUserModal = () => {
    setUserShow(true);
    handleClose();
  };

  const hideModal = () => {
    setShow(false);
    setCVmodal(false);
    props.change();
  };

  const hideUserModal = () => {
    setUserShow(false);
  };

  const showCustomerVendorModal = () => {
    setCVmodal(true);
    setAnchorEl(null);
  };

  const showTransactions = (type) => {
    props.showTransactions(instance, type)
  }

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    instance
  ) => {
    setAnchorEl(event.currentTarget);
    setInstance(instance);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteInstance = () => {
    deleteFunction(
      `Delete ${props.name}`,
      instance.name,
      `${constants.baseUrl}/${props.url}/${instance._id}`,
      props.change
    );
    setAnchorEl(null);
    handleClose();
  };

  const updateInstance = () => {
    props.update(instance);
    handleClose();
  };

  let state = props.state;

  return (
    <div style={{ width: "95%", margin: "auto" }}>
      {show && <GiveUser hideModal={hideModal} employee={instance} />}

      {userShow && (
        <ResetUser
          hideModal={hideUserModal}
          user={instance}
          change={() => props.change()}
        />
      )}

      {cVModal && (
        <CustomerAndVendorPayment
          hideModal={hideModal}
          instance={instance}
          name = {props.name.toLowerCase()}
          arr={[{ label: "Enter Amount", type: "number", name: "credit" }]}
        />
      )}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{}}
      >
        {(props.name == "Customer" || props.name == "Vendor") && (
          <MenuItem
            onClick={() => {
              if (activeUser.privillages.includes("Payment"))
                showCustomerVendorModal();
              else alert("You have no access!");
            }}
          >
            Payment
          </MenuItem>
        )}

        {props.name == "User" && (
          <MenuItem
            onClick={() => {
              if (activeUser.privillages.includes("Reset User"))
                showUserModal();
              else alert("You have no access");
            }}
          >
            Reset User
          </MenuItem>
        )}

        {props.name == "Employee" && (
          <MenuItem
            onClick={() => {
              if (activeUser.privillages.includes("Give User")) showModal();
              else alert("You have no access");
            }}
          >
            Give User
          </MenuItem>
        )}

        {(props.name == "Employee" ||
          props.name == "Product" ||
          props.name == "User") && (
          <MenuItem
            onClick={() => {
              if (activeUser.privillages.includes(`Delete ${props.name}`))
                deleteInstance();
              else alert("You have no access!");
            }}
          >
            Delete {props.name}
          </MenuItem>
        )}

        {(props.name == "Employee" ||
          props.name == "Product" ||
          props.name == "Vendor" ||
          props.name == "Customer") && (
          <MenuItem
            onClick={() => {
              if (activeUser.privillages.includes(`Update ${props.name}`))
                updateInstance();
              else alert("You have no access!");
            }}
          >
            Update {props.name}
          </MenuItem>
        )}

        {(props.name == "Customer" || props.name == "Vendor")
          &&  <MenuItem onClick={() => {
          if (activeUser.privillages.includes("View Transactions"))
          showTransactions('Transaction')
          else alert("You have no access!")
          }}>View Transactions</MenuItem>}

        {(props.name == "Customer" || props.name == "Vendor")
          &&  <MenuItem onClick={() => {
          if (activeUser.privillages.includes("View Sales"))
          showTransactions("Sale")
          else alert("You have no access!")
          }}>{props.name == "Customer" ? "View Sales" : 
          "View Purchases"}</MenuItem>}

      </Menu>

      <MaterialTable
        columns={columns}
        data={props.data}
        localization={{
          body: {
            emptyDataSourceMessage: state,
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
        //   pageSize: props.data.length < 100 ? props.data.length < 8 ? 8 : props.data.length : 100,
          draggable: false,
          actionsColumnIndex: -1,
          headerStyle: { background: "#EFF0F6", fontSize: "13px" },
        }}
        actions={[
          {
            icon: () => (
              <BiDotsHorizontalRounded
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              />
            ),
            tooltip: "Save User",
            onClick: (event, rowData) => {
              handleClick(event, rowData);
            },
            position: "row",
          },
        ]}
        style={{ borderRadius: "10px", boxShadow: "none", }}
      />
    </div>
  );
};

export default Table;
