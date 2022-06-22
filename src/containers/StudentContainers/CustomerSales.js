import React from "react"
import jaabirLogo from "../../assets/images/jaabirLogo.jpg";
import { Avatar } from "@mui/material";
import { Divider } from "@material-ui/core";
import MaterialTable from "material-table";
import moment from 'moment'

const CustomerSales = (props) => {

    const yeah = props.customer.transactions[0].date
    const formatted = moment(yeah).format('DD/MM/YYYY')
    // .date?.toLocaleDateString('en-US', {
    //     year: 'numeric',
    //     month: '2-digit',
    //     day: '2-digit',
    //   })
    
    console.log(formatted)

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
        rowStyle: {border: "none"},
        headerStyle: { background: "#EFF0F6", fontSize: "13px",
            borderTop: "1px solid grey", borderBottom: "1px solid grey" },
       
      }

      const columns = [
   
        { title: "Transaction ID", field: "transactionId", width: "4%",
        cellStyle: { border: "none"} },
        { title: "Description", field: "description", width: "4%",
        render: (data) => <p> {data.sale ? `${data.description}#${data.sale.saleNumber}` : data.description}</p>,
        cellStyle: { border: "none"} },
        { title: "Transaction Date", field: "date", 
        render: (data)=>{
            const formatted = moment(data.date).format('DD/MM/YYYY')
            return <p>{formatted}</p>
        }
        , cellStyle: { border: "none"} },
        { title: "User", field: "user", cellStyle: { border: "none"} },
        { title: "Debit", field: "debit", cellStyle: { border: "none"} },
        { title: "Credit", field: "credit", cellStyle: { border: "none"} },
        { title: "Balance", field: "balance", cellStyle: { border: "none"} },
      ];

      const data = [
        {name: "Caaqil Ali Ahmed", username: "caaqil323",
        password: "caaqil2022", city: "Mogadishu", phone: 30},
        {name: "Caaqil Ali Ahmed",city: "Mogadishu", phone: 30, username: "caaqil323", password: "caaqil2022"},
        {name: "Caaqil Ali Ahmed",city: "Mogadishu", phone: 30, username: "caaqil323", password: "caaqil2022"},
        {name: "Caaqil Ali Ahmed",city: "Mogadishu", phone: 30, username: "caaqil323", password: "caaqil2022"},
        {name: "Caaqil Ali Ahmed",city: "Mogadishu", phone: 30, username: "caaqil323", password: "caaqil2022"},
        {name: "Caaqil Ali Ahmed",city: "Mogadishu", phone: 30, username: "caaqil323", password: "caaqil2022"},
        {name: "Caaqil Ali Ahmed",city: "Mogadishu", phone: 30, username: "caaqil323", password: "caaqil2022"},
        
      ]

    return (
        <div style={{background: "white", width: "95%",
        margin: "20px auto", borderRadius: "10px"}}>
             <div style={{marginTop: "20px", display: "flex",
            flexDirection: "column", alignItems: "center",
            gap: "15px"}}>
            <Avatar sx={{ width: 130, height: 130 }}
            style={{ backgroundColor: "white", color: "orange" }}>
              <img
                src={jaabirLogo}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
              </Avatar>
              <p style={{margin: "0px", fontWeight: "700",
                fontSize:"25px"}}> Customer Transactions</p>
            </div>

            <Divider style = {{height: "1px", margin: "20px 0px",
                background: "grey"}}/>

            <div style={{display: "flex", flexDirection: "row",
                justifyContent: "space-between", padding: "20px",
                fontSize: "20px"}}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <div style={{display: "flex", gap: "20px"}}>
                    <p style={{fontWeight: "700"}}> Customer Name:</p>
                    <p> {props.customer.name}</p>
                    </div>
                    <div style={{display: "flex", gap: "20px"}}>
                    <p style={{fontWeight: "700"}}> Customer Phone:</p>
                    <p> {props.customer.phone}</p>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <div style={{display: "flex", gap: "20px"}}>
                    <p style={{fontWeight: "700"}}> Customer Address:</p>
                    <p> {props.customer.nationality}</p>
                    </div>
                    <div style={{display: "flex", gap: "20px"}}>
                    <p style={{fontWeight: "700"}}> Customer Email:</p>
                    <p> {props.customer.email}</p>
                    </div>
                </div>
            </div>

 <MaterialTable
        columns={columns}
        data={props.customer.transactions}
        options={materialOptions}
        style={{ borderRadius: "10px", boxShadow: "none",
        width: "100%", marginTop: "0px", background: "#F7F7F7" }}
      />

        </div>
    )
}

export default CustomerSales
