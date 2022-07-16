import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {Typography, Button, MenuItem, Menu, Avatar} from "@material-ui/core"
import axios from "axios";
import profile from "../../assets/images/tablePic.png"
import { useSelector } from "react-redux";

const ProductsTable = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [show, setShow] = useState(false)
  const [product, setProduct] = useState('')
  const [force, setForce] = useState(1)
  const activeUser = useSelector(state => state.activeUser.activeUser)

  const columns = [
   
    { title: "Product Name", field: "name" , width: "8%",},
    { title: "Unit Price", field: "unitPrice"},
    { title: "quantity", field: "quantity"},
    { title: "Sale Price", field: "salePrice"},
    
  ];

  const showModal = () =>{
    setShow(true)
    handleClose()
  }

  const hideModal = () =>{
    setShow(false)
    props.change()
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, product) => {
    setAnchorEl(event.currentTarget);
    setProduct(product)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteProduct = async () => {
    axios.delete(`http://127.0.0.1:80/api/v1/products/${product._id}`).then((res)=>{
      alert("Successfuly Deleted")
    }).catch((err)=>
    alert(err.response.data.message))
    handleClose()
    props.change()
    setForce(state => state + 1)
  };

  const updateProduct = () => {
    props.update(product)
  }

  const selectionHandler = (data) => {
    props.selectProducts(data)
  }

  const showProfile = () => {
    props.showProfile()
  }

  let state = props.state


  useEffect(()=> {

  }, [props, force])


  return (
    <div style={{ width: "95%", margin: "auto" }}>

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
        {/* <MenuItem onClick={showModal}>Assign to class</MenuItem> */}
        <MenuItem onClick={()=> {
          if (activeUser.privillages.includes('Delete Product'))
          deleteProduct()
          else alert("You have no access!")
          }}>Delete Product</MenuItem>
        <MenuItem onClick={() => {
          if (activeUser.privillages.includes('Update Product'))
          updateProduct()
          else alert("You have no access")
          }}>Update Product</MenuItem>
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
            tooltip: "Product Actions",
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

export default ProductsTable;
