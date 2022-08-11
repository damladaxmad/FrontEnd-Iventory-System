import React, { useState, useEffect, useReducer } from "react";
import { Button } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import {Select} from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import RegisterProducts from "../containers/ProductsContainers/RegisterProducts";
import { setProducts } from "../redux/actions/productsActions";
import {Tabs, Tab, Box} from "@mui/material"
import Available from "../containers/ProductsContainers/Available";
import AddProducts from "../containers/ProductsContainers/AddProducts";
import { constants } from "../Helpers/constantsFile";
import useFetch from "../funcrions/DataFetchers";
import Table from "../utils/Table";
const Products = () => {
  const [newProducts, setNewProducts] = useState(false)
  
  const [buttonName, setButtonName] = useState('Add New Products')
  const [update, setUpdate] = useState(false)
  const [showCornerIcon, setShowCornerIcon] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [updatedProduct, setUpdatedProduct] = useState(null)
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [showProfile, setShowProfile] = useState(false)
  const [assignMany, setAssignMany] = useState(false)
  const [productIds, setProductsIds] = useState('')
  const [force, setForce] = useState(1)
  const [state, setState] = useState('')
  const activeUser = useSelector(state => state.activeUser.activeUser)
  const [value, setValue] = React.useState("Products");

  const columns = [
    { title: "Product Name", field: "name", width: "8%" },
    { title: "Unit Price", field: "unitPrice" },
    { title: "quantity", field: "quantity" },
    {
      title: "Sale Price",
      field: "salePrice",
      render: (data) => <p>{constants.moneySign}{data.salePrice}</p>,
    },
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setNewProducts(false)
    setButtonName("Add New Products")
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, product) => {
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
    setForce(state => state + 1)
  }

  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.products);
  dispatch(setProducts(useFetch("products", force, "products")));
  const statusArr = ["All", "Active", "Inactive"]
  const [status, setStatus] = useState(statusArr[0]);
  const [query, setQuery] = useState("");


  const statusHandler = (e) => {
    setStatus(e.target.value)
  }

  const addProductHandler = () => {
    setQuery('')
    // setValue("no")
    if (buttonName == "Add New Products"){
      setNewProducts(true)
      setButtonName("Go To Products")
      setShowProfile(false)
      return
    } else if (buttonName == "Go To Products") {
      // setShowProfile(false)
      setValue("Products")
      setNewProducts(false)
      setButtonName("Add New Products") 
      setUpdate(false)
    }
   
    
  }

  const handler = (data) => { 
 
    if (data?.length > 0) {
      return data.filter(
        (std) =>
        std.name.toLowerCase().includes(query)
      );
    } else {
      return
    }  
  };

  let productsIds = '';
  const selectHandler = (data) => {
    data.map((d)=> {
      productsIds += d._id
      productsIds += ','
    })
    const slicedProductsIds = productsIds.slice(0, -1)
    setProductsIds(slicedProductsIds)

    setShowCornerIcon(true)
    if (data.length < 1) {
      setShowCornerIcon(false)
    }
  }

  const updateHandler = (product) => {
    // setNewProducts(true)
    setButtonName("Go To Products")
    setUpdate(true)
    setUpdatedProduct(product)
  }

  const resetFomr = () => {
    setUpdate(false)
    setForce(state => state + 1)
  }

  useEffect(()=> {
    setState("Loading...")
  }, [force])

  useEffect(()=> {
    if (query != '') {
      setState("No matching products!")
    }
  }, [query])

  const showProfileHandler = () => {
    setShowProfile(true)
    setButtonName("Go To Products")
  }

  const hideModal = () =>{
    setValue("Products")
    setNewProducts(false)
    setButtonName("Add New Products") 
    setUpdate(false)
    setForce(state => state + 1)
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
             <Box sx={{ width: "50%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="black"
            indicatorColor="primary"
            aria-label="secondary tabs example"
            disableFocusRipple = {true}
          >
            

          {activeUser.privillages.includes("Products") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value= "Products" label="Products"
            style={{ fontSize: "16px", fontWeight: "700" }} />}

          {activeUser.privillages?.includes("Available") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value="Available" label="Available"
            style={{ fontSize: "16px", fontWeight: "700" }} />}
          </Tabs>
        </Box>
       
         <Button
          variant="contained"
          style={{
            backgroundColor: "#2F49D1",
            color: "white",
          }}
          onClick = {() => {
            if (activeUser.privillages.includes('Add New Products'))
            addProductHandler()
            else alert("You have no access!")
          }}
          startIcon={
            buttonName == "Go To Products" ? <BiArrowBack
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
      { !showProfile && value == "Products" &&
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
      
        </div>
      </div>}
      {value == "Available" && <Available/>}
      { !showProfile && value == "Products" && <Table data={handler(products)} 
      change = {changeHandler} selectProducts = {selectHandler}
      update = {updateHandler} showProfile = {showProfileHandler}
      state = {state} columns = {columns} url = "products"
      name = "Product"
      />}
      {newProducts && <AddProducts hideModal = {hideModal}/>}
      {update &&
       <RegisterProducts update = {update}
      product = {updatedProduct} reset = {resetFomr} hideModal = {()=> {
        setUpdate(false)
        setButtonName("Add New Products")
      }}
      change = {changeHandler}/>}

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
        <MenuItem >Delete Product</MenuItem>
      </Menu>
    </div>
  );
};

export default Products;
