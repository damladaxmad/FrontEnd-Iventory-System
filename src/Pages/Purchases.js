import MaterialTable from "material-table";
import { Button } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import { Tabs, Tab, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import { Select, TextField } from "@mui/material";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import CloseIcon from "@material-ui/icons/Close";
import PurchasesTable from "../containers/PurchasesContainers/PurchasesTable";
import BrowsePurchases from "../containers/PurchasesContainers/BrowsePurchases";
import CreateVendor from "../containers/PurchasesContainers/CreateVendor";
import PurchasesReport from "../containers/PurchasesContainers/PurchasesReport";
import { setVendors } from "../redux/actions/vendorsActions";
import { setPurchaseList } from "../redux/actions/purchaseListActions";
import moment from "moment";
import useFetch from "../funcrions/DataFetchers";

function Purchases() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [change, setChange] = useState(1);
  const statusArr = ["cash", "invoice"];
  const [status, setStatus] = useState();
  const typeArr = ["all", "cash", "invoice"];
  const [type, setType] = useState(typeArr[0]);
  const [data, setData] = useState([]);
  const [createVendor, setCreateVendor] = useState(false);
  const [force, setForce] = useState(1);
  const [startDate, setStartDate] = useState(moment(new Date()).format("MM-DD-YYYY"))
  const [endDate, setEndDate] = useState(moment(new Date()).format("MM-DD-YYYY"))
  const [view, setView] = useState(1)

  const selectStyle = { color: "#B9B9B9", width: "100%" };

  dispatch(setVendors(useFetch("vendors", force, "vendors" )))

  const vendors = useSelector((state) => state.vendors.vendors);
  const purchaseList = useSelector((state) => state.purchaseList.purchaseList);
  const [vendor, setVendor] = useState();
  const activeUser = useSelector((state) => state.activeUser.activeUser);
  const [total, setTotal] = useState(0);
  const [value, setValue] = React.useState("New Purchase");
  const [complete, setComplete] = useState()

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const viewHandler = () => {
    setView(state => state + 1)
  }

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  const typeHandler = (e) => {
    setType(e.target.value);
  };

  const vendorHandler = (e) => {
    setVendor(e.target.value);
  };

  const browseHandler = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
    setCreateVendor(false);
    setForce((state) => state + 1);
  };

  const dataHandler = (data) => {
    setData((arr) => [...arr, data]);
  };

  useEffect(() => {
    dispatch(setPurchaseList(data));
  }, [data]);
  const totalHandler = (t) => {
    setTotal(t);
  };

  const addHandler = () => {
    setCreateVendor(true);
  };

  useEffect(() => {}, [purchaseList]);

  useEffect(() => {
    if (force == 1) return
    // fetchVendors();
  }, [force]);

  const completeHandler = () => {
    setComplete("complete")
  }

  useEffect(()=> {
    if (complete !== "complete") return
    dispatch(setPurchaseList([]));
    setData([])
  }, [complete])



  return (
    <div
      style={{
        height: "100%",
        width: "95%",
        margin: "0px auto",
        display: "flex",
        // alignItems: "center",
        gap: "0px",
        flexDirection: "column",
      }}
    >
      <Box sx={{ width: "80%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="black"
          indicatorColor="primary"
          aria-label="secondary tabs example"
          disableFocusRipple={true}
        >
          {activeUser.privillages.includes("New Purchase") && (
            <Tab
              disableFocusRipple={true}
              disableRipple={true}
              value="New Purchase"
              label="New Purchase"
              style={{ fontSize: "16px", fontWeight: "700" }}
            />
          )}

          {activeUser.privillages?.includes("Purchase Report") && (
            <Tab
              disableFocusRipple={true}
              disableRipple={true}
              value="Purchases"
              label="Purchases"
              style={{ fontSize: "16px", fontWeight: "700" }}
            />
          )}
        </Tabs>
      </Box>

      {show && <BrowsePurchases hideModal={hideModal} data={dataHandler} />}
      {createVendor && <CreateVendor hideModal={hideModal} />}
      {value == "Purchases" && (
         <div
         style={{
           display: "flex",
           alignItems: "center",
           justifyContent: "space-around",
           gap: "20px",
           padding: "15px 20px",
           background: "white",
           width: "85%",
           margin: "auto",
           marginTop: "20px",
           borderRadius: "8px 8px 0px 0px",
         }}
       >
         <TextField
           size="small"
           type="date"
           label = "Start Date"
           value= {moment(new Date(startDate)).format("YYYY-MM-DD")}
           style={{ width: "25%" }}
           onChange={(e) => setStartDate(e.target.value)}
         />
         <TextField
           size="small"
           type="date"
           label = "End Date"
           value= {moment(new Date(endDate)).format("YYYY-MM-DD")}
           placeholder="Search"
           style={{ width: "25%" }}
           onChange={(e) => setEndDate(e.target.value)}
         />
      
             <TextField
               select
               size="small"
               style={{width:"25%"}}
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               value={type}
               label="Select Type"
               onChange={typeHandler}
             >
               {typeArr.map((type, index) => (
                 <MenuItem value={type} key={index}>
                   {type}
                 </MenuItem>
               ))}
             </TextField>
             
             <Button
           variant="contained"
           style={{
             backgroundColor: "#2F49D1",
             color: "white",
             width: "25%",
             height: "40px",
             fontSize: "18px",
           }}
           onClick={viewHandler}
         >
           View
         </Button>
       </div>
      )}
      {value == "Purchases" && <PurchasesReport type = {type}
      startDate = {startDate} endDate = {endDate} view = {view}/>}

      {value == "New Purchase" && (
        <div
          style={{
            display: "flex",
            gap: "0px",
            justifyContent: "space-around",
            background: "white",
            alignItems: "center",
            width: "100%",
            padding: "20px",
            borderRadius: "10px 10px 0px 0px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              width: "100%",
            }}
          >
            <FormControl
              style={{ padding: "0px", margin: "0px", width: "28%" }}
            >
              <TextField
                select
                style={selectStyle}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Select Type"
                onChange={statusHandler}
              >
                {statusArr.map((status, index) => (
                  <MenuItem value={status} key={index}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <FormControl
              style={{
                padding: "0px",
                margin: "0px",
                width: "28%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "8px",
              }}
              disabled={status == "cash" ? true : false}
            >
              <TextField
                disabled={status == "invoice" ? false : true}
                select
                style={selectStyle}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={vendor}
                label="Select Vendor"
                onChange={vendorHandler}
              >
                {vendors?.map((vendor, index) => (
                  <MenuItem value={vendor._id} key={index}>
                    {vendor.name}
                  </MenuItem>
                ))}
              </TextField>

              
            </FormControl>
            <div
                style={{
                  height: "52px",
                  width: "70px",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  border: "1px solid #BDBDBD",
                  borderRadius: "5px",
                }}
              >
                <AiOutlinePlus
                  style={{
                    color: "black",
                    opacity: 0.5,
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "25px",
                    fontWeight: "bolder",
                  }}
                  onClick={addHandler}
                />
              </div>
          </div>

          <Button
            variant="contained"
            style={{
              backgroundColor: "#2F49D1",
              color: "white",
              width: "25%",
              height: "50px",
              fontSize: "18px",
            }}
            onClick={browseHandler}
          >
            browse
          </Button>
          <div style={{background: "#F0F2FA", height: "50px", display: "flex",
           alignItems: "center",
              border: "1px solid #C7C7C7", padding: "8px", fontWeight:"bold", borderRadius:"4px",
              fontSize:"16px", width: "15%", marginLeft: "5px" }}>
              <p> R{total}</p>
          </div>

        </div>
      )}

      {value == "New Purchase" && (
        <PurchasesTable
          data={purchaseList}
          vendor={vendor}
          paymentType={status}
          total={totalHandler}
          complete = {completeHandler}
        />
      )}
    </div>
  );
}

export default Purchases;