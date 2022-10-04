import { Tabs, Tab, Box, Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Select, TextField, Button, MenuItem, Menu } from "@mui/material";
import Reports from "../utils/Reports";
import AvailableTable from "../utils/AvailableTable";
import { FormGroup } from "@material-ui/core";

const Report = () => {

  const [startDate, setStartDate] = useState(moment(new Date()).format("MM-DD-YYYY"))
  const [endDate, setEndDate] = useState(moment(new Date()).format("MM-DD-YYYY"))
  const [view, setView] = useState(1)
  const typeArr = ["all", "cash", "invoice"];
  const [type, setType] = useState(typeArr[0]);
  const activeUser = useSelector((state) => state.activeUser.activeUser);
  const [value, setValue] = React.useState("purchases bydate");
  const [saleEl, setSaleEl] = useState(null);
  const saleOpen = Boolean(saleEl);
  const [purchaseEl, setPurchaseEl] = useState(null);
  const purchaseOpen = Boolean(purchaseEl);
  const [summary, setSummary] = useState(false)
  const [report, setReport] = useState(false)
  const [checked, setChecked] = useState(false)

  const checkHanlder = () => {
    if (!checked) setStartDate(moment("01/01/2022").format("MM-DD-YYYY"))
    setChecked(!checked)
  }

  const handleClose = () => {
    setSaleEl(null);
  };

  const handlePurchase = () => {
    setPurchaseEl(null);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setChecked(false)
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
        <Box sx={{ width: "85%", marginLeft: "72px", marginBottom: "15px",
       background: "white", display: "flex", justifyContent: "center" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="black"
            indicatorColor="primary"
            aria-label="secondary tabs example"
            disableFocusRipple={true}
          >
            {activeUser.privillages.includes("Purchases By Date") && (
              <Tab
                disableFocusRipple={true}
                disableRipple={true}
                value="purchases bydate"
                label="Purchases By Date"
                style={{ fontSize: "15px", fontWeight: "700" }}
              />
            )}
  
            {activeUser.privillages?.includes("Sales By Date") && (
              <Tab
                disableFocusRipple={true}
                disableRipple={true}
                value="sales bydate"
                label="Sales By Date"
                style={{ fontSize: "15px", fontWeight: "700" }}
              />
            )}
            {activeUser.privillages.includes("Purchases Summary") && (
              <Tab
                disableFocusRipple={true}
                disableRipple={true}
                value="purchases summary"
                label="Purchases Summary"
                style={{ fontSize: "15px", fontWeight: "700" }}
              />
            )}
  
            {activeUser.privillages?.includes("Sales Summary") && (
              <Tab
                disableFocusRipple={true}
                disableRipple={true}
                value="sales summary"
                label="Sales Summary"
                style={{ fontSize: "15px", fontWeight: "700" }}
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
            style={{ width: "20%" }}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            size="small"
            type="date"
            label = "End Date"
            value= {moment(new Date(endDate)).format("YYYY-MM-DD")}
            placeholder="Search"
            style={{ width: "20%" }}
            onChange={(e) => setEndDate(e.target.value)}
          />
       
              <TextField
                select
                size="small"
                style={{width:"20%"}}
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

              <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            style={{ padding: "5px 15px" }}
            color="primary"
            checked={checked}
            onChange={() => checkHanlder()}
          />
        }
        label="All"
      />
    </FormGroup>
              
              <Button
            variant="contained"
            style={{
              backgroundColor: "#2F49D1",
              color: "white",
              width: "20%",
              height: "40px",
              fontSize: "18px",
            }}
            onClick={viewHandler}
          >
            View
          </Button>
        </div>
      {value == "sales bydate" &&  <Reports type = {type}
      startDate = {startDate} endDate = {endDate} view = {view}
      name = {"Sales"}/>}
      {value == "purchases bydate" &&  <Reports type = {type}
      startDate = {startDate} endDate = {endDate} view = {view}
      name = {"Purchasaes"}/>}

      {value == "sales summary" && <AvailableTable name = "Sales"
      url = {`reports/item-sales-report-by-date/${startDate}/${endDate}`}
      returnData = "sales"/>}
     {value == "purchases summary" && <AvailableTable name = "Purchases"
      url = {`reports/item-purchases-report-by-date/${startDate}/${endDate}`}
      returnData = "purchases"/>}
  
        </div>
    )
}

export default Report