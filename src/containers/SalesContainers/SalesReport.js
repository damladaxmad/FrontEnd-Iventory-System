import { Typography } from "@mui/material"
import MaterialTable from "material-table"
import { useEffect, useState } from "react"
import axios from "axios"
import { Divider } from "@material-ui/core"

const SalesReport = (props) => {

  const [sales, setSales] = useState()

  const fetchSales = async () => {
    const response = await axios
    .get("http://127.0.0.1:80/api/v1/sales")
    .catch((err) => {
      alert(err.message);
    });
   setSales(response.data.data.sales)
};

  useEffect(()=> {
    fetchSales()
  }, [])
    return <div style = {{alignSelf: "center", marginTop:"10px",
    display: "flex", alignItems: "center", flexDirection:"column",
    width: "85%", marginBottom: "30px", background: "white",
    padding: "30px 65px", gap: "10px"}}>
        <h2 > Sales Report</h2>
            <div style = {{display:"flex", gap:"150px",
        marginBottom: "20px"}}>
            <p style={{margin: "0px"}}> From July 3, 2022</p>
            <p style={{margin: "0px"}}> To July 7, 2022</p>
            </div>

            {sales?.map(sale => (
              <SaleComp sale = {sale} />
            ))}
            <Divider orientation="horizantal" color = "white"/>
            <h2> Hello world</h2>
           
    </div>

}

const SaleComp = (props) => {

    const columns = [
   
        { title: "Product Name", field: "item", width: "4%",
    cellStyle: {padding: "0px 30px", height: "0px"}},
        { title: "Quantity", field: "quantity"},
        { title: "Price", field: "price", render: (data)=> <p>
          R{data.price}
        </p>},
        { title: "Subtotal", field: "subtotal", render: (data)=> <p>
        R{data.subtotal}
      </p>},
        
      ];

    return <div style = {{width:"100%", marginTop: "0px"}}>
        <div style={{background: '#F0F2FA', padding: "2px 5px",
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

        components={{
          Row: props => {
        return <div style={{display: "flex", justifyContent: "space-around", margin: "5px 0px",
        borderBottom: "1px solid black", padding: "2px 20px"}}>
          <p style={{margin: "0px", flex: 2}}> {props.data.item}</p>
          <p style={{margin: "0px", flex: 1}}> {props.data.quantity}</p>
          <p style={{margin: "0px", flex: 1}}> R{props.data.price}</p>
          <p style={{margin: "0px", flex: 1}}> R{props.data.subtotal}</p>
          </div>
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
            padding: "5px 0px",
          }}
        >
          Total:
        </p>
        <p style={{ padding: "5px 0px" }}> R{props.sale.total}</p>
      </div>
    </div>
}

export default SalesReport