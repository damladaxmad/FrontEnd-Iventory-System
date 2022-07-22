import React, { useState } from "react";
import jaabirLogo from "../../assets/images/jaabirLogo.jpg";
import { Divider } from "@material-ui/core";
import femaleProfile from "../../assets/images/sampleProfile.png";
import MaterialTable from "material-table";
import moment from "moment";
import { useSelector } from "react-redux";
import InvoicePopUp from "./InvoicePopUp";

const CustomerSales = (props) => {
  const companyInfo = useSelector((state) => state.companyInfo.companyInfo);
  const [show, setShow] = useState(false);
  const [data, setData] = useState();

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
    {
      title: "Description",
      field: "description",
      width: "4%",
      render: (data) => (
        <p>
          {" "}
          {data.sale
            ? `${data.description}#${data.sale.saleNumber}`
            : data.description}
        </p>
      ),
      cellStyle: { border: "none" },
    },
    {
      title: "Invoice",
      field: "invoice",
      render: (data) => (
        <p
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => {
            setData(data?.sale?.products);
            setShow(true);
          }}
        >
          {" "}
          {data?.sale?.invoice}
        </p>
      ),
      cellStyle: { border: "none" },
    },
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
    {
      title: "Balance",
      field: "balance",
      render: (data) => (
        <p>
          {data.balance < 0 ? `-R${data.balance * -1}` : `R${data.balance}`}
        </p>
      ),
      cellStyle: { border: "none" },
    },
  ];

  const hideModal = () => {
    setShow(false);
  };

  return (
    <>
      {show && <InvoicePopUp hideModal={hideModal} data={data} />}
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
      >
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
          }}
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
            Customer Transactions
          </p>
        </div>

        <Divider
          style={{ height: "1px", margin: "20px 0px", background: "grey" }}
        />

      
          <div style={{ display: "flex", flexDirection: "row",
            justifyContent: "space-between", padding: "10px",
            fontSize: "20px",}}>
            <div style={{ display: "flex", gap: "20px" }}>
              <p style={{ fontWeight: "700" }}> Customer Name:</p>
              <p> {props.customer.name}</p>
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              <p style={{ fontWeight: "700" }}> Customer Phone:</p>
              <p> {props.customer.phone}</p>
            </div>
          </div>

        <MaterialTable
          columns={columns}
          data={props.customer.transactions}
          options={materialOptions}
          style={{
            borderRadius: "10px",
            boxShadow: "none",
            width: "100%",
            marginTop: "0px",
            background: "#F7F7F7",
          }}
        />
      </div>
      <div
        style={{
          margin: "0px auto",
          background: "#F7F7F7",
          borderRadius: "0px 0px 10px 10px",
          display: "flex",
          fontSize: "16px",
          alignSelf: "flex-end",
          gap: "15px",
          width: "95%",
        }}
      >
        <p
          style={{
            margin: "0px",
            fontWeight: "700",
            marginLeft: "840px",
            padding: "20px 0px",
          }}
        >
          {" "}
          Total:
        </p>
        <p style={{ padding: "20px 0px" }}>
          {props.customer.balance < 0
            ? `-R${props.customer.balance * -1}`
            : `R${props.customer.balance}`}
        </p>
      </div>
    </>
  );
};

export default CustomerSales;
