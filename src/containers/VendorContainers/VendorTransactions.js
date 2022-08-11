import React, { useState, useRef } from "react";
import jaabirLogo from "../../assets/images/jaabirLogo.jpg";
import { Divider,  } from "@material-ui/core";
import femaleProfile from "../../assets/images/sampleProfile.png";
import MaterialTable from "material-table";
import moment from "moment";
import { useSelector } from "react-redux";
import InvoicePopUp from "./InvoicePopUp";
import {AiFillPrinter} from "react-icons/ai"
import { Button } from "@mui/material";
import ReactToPrint from "react-to-print"
import { constants } from "../../Helpers/constantsFile";

const VendorTransactions = (props) => {
  const componentRef = useRef();
  const companyInfo = useSelector(state => state.companyInfo.companyInfo)
  const [show, setShow] = useState(false)
  const [data, setData] = useState()

  const materialOptions = {
    showTitle: false,
    exportButton: true,
    sorting: false,
    showTextRowsSelected: false,
    toolbar: false,
    paging: false,
    pageSizeOptions: [2, 5, 8, 10, 20, 25, 50, 100],
    pageSize: 4,
    draggable: false,
    actionsColumnIndex: -1,
    rowStyle: { border: "none" },
    headerStyle: {
      background: "#EFF0F6",
      fontSize: "13px",
      borderTop: "1px solid grey",
      borderBottom: "1px solid grey",
    },
  };

  const columns = [
    {
      title: "Transaction ID",
      field: "transactionId",
      width: "4%",
      cellStyle: { border: "none" },
    },
    // {
    //   title: "Description",
    //   field: "description",
    //   width: "4%",
    //   render: (data) => (
    //     <p>
    //       {" "}
    //       {data.sale
    //         ? `${data.description}#${data.sale.saleNumber}`
    //         : data.description}
    //     </p>
    //   ),
    //   cellStyle: { border: "none" },
    // },
    { title: "Invoice", field: "invoice", 
    render: (data) => <p style={{cursor: "pointer",
  color: "blue"}} onClick = {()=> {
    setData(data?.sale?.products)
    setShow(true)
  }}> {data?.sale?.saleNumber}</p>,
    cellStyle: { border: "none" } },
    {
      title: "Transaction Date",
      field: "date",
      render: (data) => {
        const formatted = moment(data.date).format("DD/MM/YYYY");
        return <p>{formatted}</p>;
      },
      cellStyle: { border: "none" },
    },
    { title: "User", field: "user", cellStyle: { border: "none" } },
    { title: "Debit", field: "debit", cellStyle: { border: "none" } },
    { title: "Credit", field: "credit", cellStyle: { border: "none" } },
    { title: "Balance", field: "balance", render: (data) =>
    <p>{data.balance < 0 ? `-${constants.moneySign}${data.balance*-1}` : `${constants.moneySign}${data.balance}`}</p>
  },
  ];

  const hideModal = () => {
    setShow(false)
  }


  return (
    <>
    {show && <InvoicePopUp hideModal = {hideModal}
    data = {data}/>}
      <div
        style={{
          background: "#F7F7F7",
          width: "95%",
          margin: "20px auto",
          display: "flex",
          marginBottom: "0px",
          borderRadius: "10px 10px 0px 0px",
          flexDirection: "column",
        }}
        class = "waryaa"
        ref={componentRef}
      >
         <ReactToPrint
        trigger={() => 
          <Button
          variant="contained"
          style={{
            backgroundColor: "#2F49D1",
            color: "white",
            width: "100px",
            alignSelf: "flex-end",
            margin: "10px"
          }}
          startIcon={
            <AiFillPrinter
            style={{
              color: "white",
            }}
          />
          }
        >
          Print
        </Button>}
        content={() => componentRef.current}
        pageStyle = "print"
      />
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
          }}
          class = "imgDiv"
        >
         
            <img
              src={companyInfo ? companyInfo.imageURl : femaleProfile}
              style={{
                width: "150px",
                height: "150px",
              }}
            />
          <p style={{ margin: "0px", fontWeight: "700", fontSize: "25px" }}>
            {" "}
            Vendor Transactions
          </p>
        </div>

        <Divider
          style={{ height: "1px", margin: "20px 0px", background: "grey" }}
        />

              <div style={{ display: "flex", flexDirection: "row",
            justifyContent: "space-between", padding: "10px",
            fontSize: "20px",}}>
            <div style={{ display: "flex", gap: "20px" }}>
              <p style={{ fontWeight: "700" }}> Vendor Name:</p>
              <p> {props.vendor.name}</p>
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              <p style={{ fontWeight: "700" }}> Vendor Phone:</p>
              <p> {props.vendor.phone}</p>
            </div>
          </div>

        <MaterialTable
          columns={columns}
          data={props.vendor.transactions}
          options={materialOptions}
          style={{
            borderRadius: "10px",
            boxShadow: "none",
            width: "100%",
            marginTop: "0px",
            background: "#F7F7F7",
          }}
        />
            <div
        style={{
          margin: "0px auto",
          background: "#F7F7F7",
          borderRadius: "0px 0px 10px 10px",
          display: "flex",
          fontSize: "15px",
          justifyContent: "flex-end",
          gap: "15px",
          padding: "10px 0px",
          width: "95%",
        }}
      >
        <p
          style={{
            margin: "0px",
            fontWeight: "700",
          }}
        >
          Total:
        </p>
        <p > {props.vendor.balance < 0 ? `-${constants.moneySign}${props.vendor.balance*-1}` : `${constants.moneySign}${props.vendor.balance}`}</p>

      </div>
      </div>
  
    </>
  );
};

export default VendorTransactions;
