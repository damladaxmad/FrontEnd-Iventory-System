import { Typography } from "@mui/material";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import axios from "axios";
import { Divider } from "@material-ui/core";
import JsPDF from "jspdf";

var doc = new JsPDF("p", "px", "a4");

var width = doc.internal.pageSize.getWidth();
var height = doc.internal.pageSize.getHeight();

const generatePDF = () => {
  const report = doc;
  report.html(document.getElementById("saleReport")).then(() => {
    report.save("sales.pdf");
  });
};

const PurchasesReport = (props) => {
  
  const [purchases, setPurchases] = useState();
  let totalPurchases = 0

  const fetchPurchases = async () => {
    const response = await axios
      .get("http://127.0.0.1:80/api/v1/purchases")
      .catch((err) => {
        alert(err.response.data.message);
      });
      setPurchases(response.data.data.purchases);
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return (
    <div
    id="saleReport"
      style={{
        alignSelf: "center",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "85%",
        marginBottom: "30px",
        background: "white",
        padding: "30px 65px",
        gap: "10px",
      }}
    >
      <h2> Purchases Report</h2>
      <div style={{ display: "flex", gap: "10%", marginBottom: "20px",
    width: "100%", justifyContent: "center" }}>
        <p style={{ margin: "0px" }}> From July 3, 2022</p>
        <p style={{ margin: "0px" }}> To July 7, 2022</p>
      </div>

      {purchases?.map((purchase) => {
       totalPurchases += purchase.total
       return <SaleComp purchase={purchase} />
      })}
      <Divider orientation="horizantal" color="white" />
    
      <div
        style={{
          margin: "0px auto",
          background: "white",
          borderRadius: "0px 0px 10px 10px",
          display: "flex",
          fontSize: "15px",
          //   alignSelf: "flex-end",
          gap: "15px",
            width: "95%"
        }}
      >
        <p
          style={{
            margin: "0px",
            fontWeight: "700",
            marginLeft: "85%",
            padding: "5px 0px",
          }}
        >
          Total:
        </p>
        <p style={{ padding: "5px 0px" }}> {totalPurchases}</p>
      </div>
    </div>
  );
};

const SaleComp = (props) => {

  return (
    <div style={{ width: "100%", marginTop: "0px" }}>
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
        <Typography> PurchaseNumber: {props.purchase.purchaseNumber}</Typography>
        <Typography> Date: 2022/7/3</Typography>
        <Typography> Type: {props.purchase.paymentType}</Typography>
        <Typography> Total: R{props.purchase.total}</Typography>
      </div>
      <MaterialTable
        data={props.purchase.products}
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
                  justifyContent: "space-around",
                  margin: "1px 20px",
                  borderBottom: "0.5px solid grey",
                  padding: "2px 0px",
                  fontSize: 13,
                }}
              >
                <p style={{ margin: "0px", flex: 2 }}> {props.data.item}</p>
                <p style={{ margin: "0px", flex: 1 }}> {props.data.quantity}</p>
                <p style={{ margin: "0px", flex: 1 }}> R{props.data.unitPrice}</p>
                <p style={{ margin: "0px", flex: 0 }}>
                  {" "}
                  R{props.data.subtotal}
                </p>
              </div>
            );
          },
        }}
        style={{ boxShadow: "none", background: "white", width: "65%" }}
      />
      <div
        style={{
          margin: "0px auto",
          background: "white",
          borderRadius: "0px 0px 10px 10px",
          display: "flex",
          fontSize: "13px",
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
        <p style={{ padding: "5px 0px" }}> R{props.purchase.total}</p>
      </div>
    </div>
  );
};

export default PurchasesReport;
