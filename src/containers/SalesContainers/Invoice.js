import { useSelector } from "react-redux";
import Modal from "../../Modal/Modal";
import MaterialTable from "material-table";
import { Button } from "@mui/material";
import ReactToPrint from "react-to-print"
import React, { useRef } from 'react';
import styles from "./invoice.module.css"
import {AiFillPrinter} from "react-icons/ai"
const Invoice = (props) => {
  const componentRef = useRef();
    const companyInfo = useSelector(state => state.companyInfo.companyInfo)
    return (
        <Modal onClose onClose = {props.hideModal} pwidth = "450px"
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
        pageStyle = "a5"
      />
            <div  ref={componentRef}
            class = "popup"
            style={{width: "440px", display: "flex",
        flexDirection: "column", 
        alignItems: "center", background: "white", gap: "10px",
        padding: "10px", 
        // overflowY: props.sale.products.length > 3 ? "scroll" : "none"
        
        }}>
                <h2> {companyInfo.name ? companyInfo.name : "Sample Company"}</h2>

                <div style={{display: "flex", width: "100%",
                flexDirection: "column"}}>
        
                <div style={{width: "100%", display:"flex",
            flexDirection: "column", justifySelf: "start",
            fontSize: "16px"}}>
                    <p style = {{margin: "0px"}} > Served by: Jaamac Ali</p>
                    <p style = {{margin: "0px"}}> Invoice#12345</p>
                    <p style = {{margin: "0px"}}> Janurary 29, 2022</p>
                </div>
                <MaterialTable
        // columns={columns}
        data={props.sale.products}
        //     localization={{
        //       body: {
        //           emptyDataSourceMessage: (
        //               state
        //           ),
        //       },
        //   }}
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
                  // justifyContent: "space-around",
                  margin: "15px 0px",
                  borderBottom: "0.5px solid grey",
                  padding: "2px 0px",
                  fontSize: "14px",
                }}
              >
                <p style={{ margin: "0px", width: "45%"}}> {props.data.item}</p>
                <p style={{ margin: "0px", width: "35%"}}> {props.data.quantity}</p>
                <p style={{ margin: "0px", width: "30%", textAlign: "end"}}> R{props.data.price}</p>
                
              </div>
            );
          },
        }}
        style={{ boxShadow: "none", background: "white", width: "100%" }}
      />
      <p style={{alignSelf: "end", fontWeight: "bold",
    fontSize: "15px"}}> Total: 
      <span style={{fontWeight: "normal"}}> R30.0</span></p>
      </div>
      <div style={{display: "flex", flexDirection: "column",
      alignItems: "center"}}>
            <p style = {{margin: "0px", padding: "opx",  fontSize: "16px"}}> Developed By Racayaam Soft</p>
            <p style = {{margin: "0px", padding: "opx", fontSize: "16px"}}> Somalia - Mogadishu - Suuq-bacaad</p>
        </div>
      </div>
        
        </Modal>
    )
}

export default Invoice