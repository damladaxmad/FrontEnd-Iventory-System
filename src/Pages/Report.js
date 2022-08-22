import { Tabs, Tab, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Select, TextField, Button, MenuItem, Menu } from "@mui/material";
import Reports from "../utils/Reports";
import AvailableTable from "../utils/AvailableTable";

const Report = () => {

  const [startDate, setStartDate] = useState(moment(new Date()).format("MM-DD-YYYY"))
  const [endDate, setEndDate] = useState(moment(new Date()).format("MM-DD-YYYY"))
  const [view, setView] = useState(1)
  const typeArr = ["all", "cash", "invoice"];
  const [type, setType] = useState(typeArr[0]);
  const activeUser = useSelector((state) => state.activeUser.activeUser);
  const [value, setValue] = React.useState("");
  const [saleEl, setSaleEl] = useState(null);
  const saleOpen = Boolean(saleEl);
  const [purchaseEl, setPurchaseEl] = useState(null);
  const purchaseOpen = Boolean(purchaseEl);
  const [summary, setSummary] = useState(false)
  const [report, setReport] = useState(false)


  const handleClose = () => {
    setSaleEl(null);
  };

  const handlePurchase = () => {
    setPurchaseEl(null);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setStartDate(moment(new Date()).format("MM-DD-YYYY"))
    setEndDate(moment(new Date()).format("MM-DD-YYYY"))
    if (newValue == "Sales")
    setSaleEl(event.currentTarget)
    if (newValue == "Purchases")
    setPurchaseEl(event.currentTarget)
  };
  const viewHandler = () => {
    setView(state => state + 1)
  }
  const typeHandler = (e) => {
    setType(e.target.value);
  };

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
            <Menu
        id="basic-menu"
        anchorEl={saleEl}
        open={saleOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{marginTop: "10px"}}
      >
            <MenuItem
            onClick={() => {
              if (activeUser.privillages.includes("Payment")){
                handleClose()
                setSummary(false)
                setReport(true)
                setSaleEl(null)
            }
              else alert("You have no access!");
            }}
          >
            Sales By Date
          </MenuItem>

          <MenuItem
            onClick={() => {
              if (activeUser.privillages.includes("Payment")){
                handleClose()
                setSummary(true)
                setReport(false)
                setSaleEl(null)
              }
              else alert("You have no access!");
            }}
          >
            Sales Item Summary
          </MenuItem>

      </Menu>

      <Menu
        id="basic-menu"
        anchorEl={purchaseEl}
        open={purchaseOpen}
        onClose={handlePurchase}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{marginTop: "10px"}}
      >
            <MenuItem
            onClick={() => {
              if (activeUser.privillages.includes("Payment")){
                handleClose()
                setSummary(false)
                setReport(true)
                setPurchaseEl(null)
              }
              else alert("You have no access!");
            }}
          >
            Purchases By Date
          </MenuItem>

          <MenuItem
            onClick={() => {
              if (activeUser.privillages.includes("Payment")){
                setSummary(true)
                setReport(false)
                setPurchaseEl(null)
              }
              else alert("You have no access!");
            }}
          >
            Purchase Item Summary
          </MenuItem>

      </Menu>
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
                value="Purchases"
                label="Purchases"
                style={{ fontSize: "16px", fontWeight: "700" }}
              />
            )}
  
            {activeUser.privillages?.includes("Purchase Report") && (
              <Tab
                disableFocusRipple={true}
                disableRipple={true}
                value="Sales"
                label="Sales"
                style={{ fontSize: "16px", fontWeight: "700" }}
              />
            )}
          </Tabs>
        </Box>

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
      {report &&  <Reports type = {type}
      startDate = {startDate} endDate = {endDate} view = {view}
      name = {value}/>}
      {summary && <AvailableTable name = {value}
      url = {`reports/item-${value.toLocaleLowerCase()}-report-by-date/08-1-2022/08-21-2022`}
      returnData = {value.toLocaleLowerCase()}/>}
  
        </div>
    )
}

export default Report