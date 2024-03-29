import { TextField } from "@mui/material"
import React from "react"
import { Typography } from "@mui/material"
import MaterialTable from "material-table"
import { constants } from "../Helpers/constantsFile"
import moment from "moment"
const CustomerVendorSales = (props) => {

    return (
    <div>
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
          placeholder="Search"
          style={{
            width: "300px",
          }}
          // onChange={(e) => setQuery(e.target.value)}
        />
         <TextField
          size="small"
          type="date"
          placeholder="Search"
          style={{
            width: "300px",
          }}
          // onChange={(e) => setQuery(e.target.value)}
        />

        

      </div>

      <div style = {{alignSelf: "center", 
      marginTop:"30px", margin: "20px auto",
    display: "flex", alignItems: "center", flexDirection:"column",
    width: "85%", marginBottom: "30px", background: "white",
    padding: "30px 65px", gap: "10px"}}>
        <h2 > {props.name == "Customer" ? "Sales Report" : "Purchase Report"}</h2>
            {/* <div style = {{display:"flex", gap:"150px",
        marginBottom: "20px"}}>
            <p style={{margin: "0px"}}> From July 3, 2022</p>
            <p style={{margin: "0px"}}> To July 7, 2022</p>
            </div> */}

            {props.instance.transactions?.map(transaction => {
            if (props.name == "Customer"){
                if (!transaction.sale) return
                else return <Comp sale = {transaction.sale} />
            } else {
                if (!transaction.purchase) return
                else return <Comp sale = {transaction.purchase} />
            }
             
            })}
    </div>
      
    </div>
    )
}

const Comp = (props) => {

  const columns = [
 
      { title: "Product Name", field: "item", width: "4%",
  cellStyle: {padding: "0px 30px"}},
      { title: "Quantity", field: "quantity"},
      { title: "Price", field: "price", render: (data)=> <p>
        ${constants.moneySign}{data.price}
      </p>},
      { title: "Subtotal", field: "subtotal", render: (data)=> <p>
      ${constants.moneySign}{data.subtotal}
    </p>},
      
    ];

  return <div style = {{width:"100%", marginTop: "0px"}}>
       <div
        style={{
          background: "#F0F2FA",
          opacity: 0.8,
          padding: "5px 5px",
          border: "0.1px solid grey",
          display: "flex",
          borderRadius: "5px",
          justifyContent: "space-around",
        }}
      >
          {props.name == "Customer" ? <Typography> SaleNumber: {props.sale.saleNumber}</Typography>
          : <Typography> PurchaseNumber: {props.sale.purchaseNumber}</Typography>}
          <Typography> Date: {moment(props.sale.date).format("DD/MM/YYYY")}</Typography>
          <Typography> Type: {props.sale.paymentType}</Typography>
          <Typography> Total: ${constants.moneySign}{props.sale.total}</Typography>
      </div>
      <MaterialTable
      columns={columns}
      data={props.sale.products}
      options={{
        rowStyle: {height: "2px"},
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
          padding: "0px"
        },
        actionsColumnIndex: -1,
        headerStyle: { display: "none"},
      }}
      components={{
        Row: (props) => {
          return (
            <div
              style={{
                display: "flex",
                // width: "100%",
                // justifyContent: "space-around",
                margin: "1px 20px",
                borderBottom: "0.5px solid grey",
                padding: "2px 0px",
                fontSize: 13,
              }}
            >
              <p style={{ margin: "0px", width: "35%"}}> {props.data.item}</p>
              <p style={{ margin: "0px", width: "20%"}}> {props.data.quantity}</p>
              <p style={{ margin: "0px", width: "20%"}}> {constants.moneySign}{props.data.price}</p>
              <p style={{ margin: "0px", width: "25%", textAlign: "end"}}>
                {" "}
                {constants.moneySign}{props.data.subtotal}
              </p>
              
            </div>
          );
        },
      }}
   
      style={{boxShadow: "none", background: "white",
  width: "70%" }}
    />
      <div
        style={{
          margin: "0px auto",
          background: "white",
          borderRadius: "0px 0px 10px 10px",
          display: "flex",
          fontSize: "13px",
          justifyContent: "flex-end",
          gap: "15px",
          padding: "2px 18px",
          width: "30%",
        }}
      >
        <p
          style={{
            margin: "0px",
            fontWeight: "700",
            padding: "5px 0px",
          }}
        >
          Total:
        </p>
        <p style={{ padding: "5px 0px" }}> {constants.moneySign}{props.sale.total}</p>
      </div>
  </div>
}

export default CustomerVendorSales