import { useSelector } from "react-redux";
import MaterialTable from "material-table";
import { Button } from "@mui/material";
import ReactToPrint from "react-to-print"
import {AiFillPrinter} from "react-icons/ai"
import {BiArrowBack} from "react-icons/bi"
import React, { useRef } from 'react';
import { constants } from "../Helpers/constantsFile";
import moment from "moment";

const SaleAndPurchaseInvoice = (props) => {
  console.log(props.data)

  const pageStyle = `@page {
    // size: 110mm 100mm;
    }
    @media print {
    @page {  size: a5 landscape;
        margin: 0px !important;
        // width: 50mm;
        padding: 0px !important;
    }
    .popup {
     margin: 0px !important;
     padding: 0px !important;
    }
    @media all {
                    .pagebreak {
                      overflow: visible; 
                    }
                }
            }
        }`;

  const componentRef = useRef();
    const companyInfo = useSelector(state => state.companyInfo.companyInfo)
    return (
        <div style = {{display: "flex", gap:"20px", flexDirection: "column"}}>

            <div style = {{display: "flex", gap:"20px", flexDirection: "row",
        width: "440px", justifyContent: "space-between"}}>
            <Button
          variant="contained"
          style={{
            backgroundColor: "#2F49D1",
            color: "white",
            width: "100px",
            alignSelf: "flex-end",
          }}
          startIcon={
            <BiArrowBack
            style={{
              color: "white",
            }}
          />
          }
          onClick = {()=> props.hideInvoice()}
        >
          Back
        </Button>
          <ReactToPrint
        trigger={() => 
          <Button
          variant="contained"
          style={{
            backgroundColor: "#2F49D1",
            color: "white",
            width: "100px",
            alignSelf: "flex-end",
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
        pageStyle = {pageStyle}
      />
            </div>
     
            <div  ref={componentRef}
            class = "popup"
            style={{width: "440px", display: "flex",
        flexDirection: "column", 
        alignItems: "center", background: "white", gap: "10px",
        padding: "10px", borderRadius: "10px"
        // overflowY: props.sale.products.length > 3 ? "scroll" : "none"
        
        }}>
                <h2> {companyInfo.name ? companyInfo.name : "Sample Company"}</h2>

                <div style={{display: "flex", width: "100%",
                flexDirection: "column"}}>
        
                <div style={{width: "100%", display:"flex",
            flexDirection: "column", justifySelf: "start",
            fontSize: "16px"}}>
                    <p style = {{margin: "0px"}} > Served by: {props.data.user}</p>
                    <p style = {{margin: "0px"}}> Invoice# {props.data.invoice}</p>
                    <p style = {{margin: "0px"}}> {moment(props.data.date).format("DD-MM-YYYY")}</p>
                </div>
                <div style = {{width: "100%", marginTop: "20px", display: "flex",
              justifyContent: "space-between", fontWeight: "bold"}}>
                 <p style={{ margin: "0px", width: "45%"}}> Product</p>
                <p style={{ margin: "0px", width: "35%"}}> Quantity</p>
                <p style={{ margin: "0px", width: "30%", textAlign: "end"}}> Subtotal</p>
                
                </div>
                <MaterialTable
        data={props.data.products}
        options={{
          rowStyle: { height: "2px" },
          showTitle: false,
          exportButton: true,
          sorting: false,
          paging: false,
          hideHeader: true,
          showTextRowsSelected: false,
          toolbar: false,
          pageSizeOptions: [2, 5, 8, 10, 20, 25, 50, 100],
          pageSize: 8,
          draggable: false,
          rowStyle: {
            height: "30px",
            padding: "0px",
          },
          actionsColumnIndex: -1,
          headerStyle: { display: "none" },
        }}
        components={{
          Row: (props) => {
            return (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  margin: "8px 0px",
                  borderBottom: "0.5px solid grey",
                  padding: "0px 0px",
                  fontSize: "14px",
                }}
              >
                <p style={{ margin: "0px", width: "45%"}}> {props.data.item}</p>
                <p style={{ margin: "0px", width: "35%"}}> {props.data.quantity}</p>
                <p style={{ margin: "0px", width: "30%", textAlign: "end"}}> {constants.moneySign}{props.data.unitPrice}</p>
                
              </div>
            );
          },
        }}
        style={{ boxShadow: "none", background: "white", width: "100%" }}
      />
      <p style={{alignSelf: "end", fontWeight: "bold",
    fontSize: "15px"}}> Total: 
      <span style={{fontWeight: "normal"}}> {constants.moneySign}30.0</span></p>
      </div>
      <div style={{display: "flex", flexDirection: "column",
      alignItems: "center"}}>
            <p style = {{margin: "0px", padding: "opx",  fontSize: "16px"}}> Developed By Racayaam Soft</p>
            <p style = {{margin: "0px", padding: "opx", fontSize: "16px"}}> Somalia - Mogadishu - Suuq-bacaad</p>
        </div>
      </div>
        
        </div>
    )
}

export default SaleAndPurchaseInvoice