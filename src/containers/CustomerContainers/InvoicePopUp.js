import MyModal from "../../Modal/Modal"
import MaterialTable from "material-table"
// import { Divider } from "@material-ui/core"
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { setProducts } from "../../redux/actions/productsActions";
// import { setOrderList } from "../../redux/actions/orderListActions";
import React, {useState, useEffect} from "react";


const InvoicePopUp = (props) => {

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
        headerStyle: { background: "#EFF0F6", fontSize: "13px", },
       
      }

      const columns = [
   
        { title: "Product Name", field: "item", width: "4%",
        cellStyle: { border: "none"} },
        { title: "Quantity", field: "quantity",
        cellStyle: { border: "none"} },
        { title: "Product Price", field: "price", width: "4%",
        cellStyle: { border: "none"}, render: (data)=>
        <p> R{data.price}</p>},
        { title: "Subtotal", field: "subtotal", width: "4%",
        cellStyle: { border: "none"}, render: (data)=>
        <p> R{data.subtotal}</p>},
      ]

      // const data = products

    return (
        <MyModal onClose = {props.hideModal} pwidth = "400px"
        ppading = "0px">
        <div style={{width: "400px", height: "100%"}}>
           <MaterialTable
        columns={columns}
        data={props.data}
        options={materialOptions}
        onRowClick={(event, rowData) => {
        //   rowClickHandler(rowData)
          }}
        style={{ borderRadius: "10px", boxShadow: "none",
        width: "100%", background: "#F7F7F7",
        height: '300px',   overflowY: props.data.length < 5 ? "none" : "scroll" }}
      />
        </div>
        </MyModal>
    )
}

export default InvoicePopUp