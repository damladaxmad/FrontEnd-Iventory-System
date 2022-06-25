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
  const activeUser = useSelector(state => state.activeUser.activeUser)

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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, product) => {
    setAnchorEl(event.currentTarget);
    setProduct(product)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteProduct = async () => {
   
    
    axios.delete(`/api/v1/products/${product._id}`).then((res)=>{
      console.log(res)
      alert("Successfuly Deleted")
    }).catch((err)=>
    alert(err.message))
    handleClose()
    props.change()
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
