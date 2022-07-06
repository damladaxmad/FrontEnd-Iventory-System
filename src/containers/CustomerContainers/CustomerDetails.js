import { TextField } from "@mui/material"
import React from "react"
import { Typography } from "@mui/material"
import MaterialTable from "material-table"

const CustomerDetails = (props) => {

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
        <h2 > Sales Report</h2>
            <div style = {{display:"flex", gap:"150px",
        marginBottom: "20px"}}>
            <p style={{margin: "0px"}}> From July 3, 2022</p>
            <p style={{margin: "0px"}}> To July 7, 2022</p>
            </div>

            {props.customer.transactions?.map(transaction => {
              if (!transaction.sale) return
              else return <SaleComp sale = {transaction.sale} />
            })}
    </div>
      
    </div>
    )
}

const SaleComp = (props) => {

  const columns = [
 
      { title: "Product Name", field: "item", width: "4%",
  cellStyle: {padding: "0px 30px"}},
      { title: "Quantity", field: "quantity"},
      { title: "Price", field: "price", render: (data)=> <p>
        R{data.price}
      </p>},
      { title: "Subtotal", field: "subtotal", render: (data)=> <p>
      R{data.subtotal}
    </p>},
      
    ];

  return <div style = {{width:"100%", marginTop: "0px"}}>
      <div style={{background: '#F0F2FA', padding: "5px 5px",
       border: "1.5px solid black", display:"flex", borderRadius:"5px",
       justifyContent: "space-around"}}> 
          <Typography> SaleNumber: {props.sale.saleNumber}</Typography>
          <Typography> Date: 2022/7/3</Typography>
          <Typography> Type: {props.sale.paymentType}</Typography>
          <Typography> Total: R{props.sale.total}</Typography>
      </div>
      <MaterialTable
      columns={columns}
      data={props.sale.products}
  //     localization={{
  //       body: {
  //           emptyDataSourceMessage: (
  //               state
  //           ),
  //       },
  //   }}
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
   
      style={{boxShadow: "none", background: "white",
  width: "70%" }}
    />
     <div
      style={{
        margin: "0px auto",
        background: "white",
        borderRadius: "0px 0px 10px 10px",
        display: "flex",
        fontSize: "16px",
      //   alignSelf: "flex-end",
        gap: "15px",
      //   width: "95%"
      }}
    >
      <p
        style={{
          margin: "0px",
          fontWeight: "700",
          marginLeft: "345px",
          padding: "10px 0px",
        }}
      >
        Total:
      </p>
      <p style={{ padding: "10px 0px" }}> R{props.sale.total}</p>
    </div>
  </div>
}



export default CustomerDetails