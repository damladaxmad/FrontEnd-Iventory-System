import MaterialTable from "material-table";
import { useState, useEffect } from "react";
import { setAvailableProducts } from "../../redux/actions/productsActions";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@mui/material";
import useFetch from "../../funcrions/DataFetchers";
import { constants } from "../../Helpers/constantsFile";
const Available = (props) => {
  const [state, setState] = useState();
  const dispatch = useDispatch();
  const availableProducts = useSelector(
    (state) => state.products.availableProducts
  );
  dispatch(
    setAvailableProducts(useFetch("products/available", state, "products"))
  );

  const dataHandler = (data) => {
    if (data?.length > 1) return data  
  }

  useEffect(() => {
    setState("Loading...");
  }, []);

  let total = 0;

  availableProducts?.map((p) => {
    total += p.total;
  });

  const columns = ["Product Name", "Quantity", "Unit Price", "Total"];
  return (
    <div
      style={{
        width: "93%",
        margin: "30px auto",
        background: "white",
        pading: "20px",
        gap: "10px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        alignItems: "center",
      }}
    >
      <h2 style={{ marginTop: "20px" }}> Available Products</h2>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "0.5px solid #E0E0E0",
          borderTop: "0.5px solid #E0E0E0",
          padding: "8px 18px",
          background: "#EFF0F6",
          color: "black",
          fontWeight: "700",
          fontSize: "15px",
        }}
      >
        {columns.map((c) => (
          <p
            style={{ margin: "0px", flex: 1, textAlign: c == "Total" && "end" }}
          >
            {c}
          </p>
        ))}
      </div>

      <MaterialTable
        data={dataHandler(availableProducts)}
        localization={{
          body: {
            emptyDataSourceMessage: state,
          },
        }}
        options={{
          rowStyle: {},
          showTitle: true,
          exportButton: false,
          search: false,
          paging: false,
          sorting: false,
          showTextRowsSelected: false,
          toolbar: false,
          pageSizeOptions: [2, 5, 8, 10, 20, 25, 50, 100],
          pageSize: 8,
          draggable: false,
          actionsColumnIndex: -1,
          headerStyle: { background: "#EFF0F6", fontSize: "13px" },
        }}
        components={{
          Row: (props) => {
            return (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  // margin: "10px 10px",
                  borderBottom: "0.5px solid #E0E0E0",
                  padding: "2px 18px",
                  fontSize: "16px",
                }}
              >
                <p style={{ margin: "0px", flex: 1 }}> {props.data.name}</p>
                <p style={{ margin: "0px", flex: 1 }}> {props.data.quantity}</p>
                <p style={{ margin: "0px", flex: 1 }}>
                  {" "}
                  {constants.moneySign}{props.data.unitPrice}
                </p>
                <p style={{ margin: "0px", flex: 1, textAlign: "end" }}>
                  {" "}
                  {constants.moneySign}{props.data.total}
                </p>
              </div>
            );
          },
        }}
        style={{ borderRadius: "10px", boxShadow: "none", width: "100%" }}
      />

      <div
        style={{
          margin: "0px auto",
          background: "white",
          borderRadius: "0px 0px 10px 10px",
          display: "flex",
          fontSize: "15px",
          justifyContent: "flex-end",
          gap: "15px",
          padding: "2px 18px",
          width: "100%",
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
        <p style={{ padding: "5px 0px" }}> {constants.moneySign}{total}</p>
      </div>
    </div>
  );
};

export default Available;
