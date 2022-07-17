import MaterialTable from "material-table"
import { useState, useEffect } from "react";
import { setAvailableProducts } from "../../redux/actions/productsActions";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const Available = (props) => {
    const [state, setState] = useState()
    const dispatch = useDispatch()
    const availableProducts = useSelector((state) => state.products.availableProducts);

    const fetchProducts = async () => {
        const response = await axios
        .get("http://127.0.0.1:80/api/v1/products/available")
        .catch((err) => {
          alert(err.response.data.message);
        });
        if (response.data.data.products.length < 1)
      setState("No products to display!") 
      dispatch(setAvailableProducts(response.data.data.products));
    };

    useEffect(()=> {
        setState("Loading...")
        fetchProducts()
      }, [])

      let total = 0

      availableProducts.map(p => {
        total += p.total
      })
    

    const columns = [
   
      "Product Name",
      "Quantity",
       "Unit Price",
        "Sale Price",
       "Measurment", 
        "Status",
        "Total", 
        
      ];
    return (
        <div style={{width: "93%", margin: "30px auto", background: "white",
        pading: "20px", gap: "10px", display: "flex", flexDirection: "column",
        borderRadius: "10px",
        alignItems: "center"}}>
            <h2 style = {{marginTop: "20px"}}> Available Products</h2>
            <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "0.5px solid grey",
                  borderTop: "0.5px solid grey",
                  padding: "8px 8px",
                  background: "#EFF0F6",
                  color: "black",
                  fontWeight: "700",
                  fontSize: "15px",
                }}
              >
                {columns.map(c => (
                  <p style={{ margin: "0px", flex: 
                    c == "Product Name" ? 2 : 1 }}> {c}</p>
                ))}
              </div>

            


             <MaterialTable
        data={availableProducts}
        localization={{
          body: {
              emptyDataSourceMessage: (
                  state
              ),
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
          headerStyle: { background: "#EFF0F6", fontSize: "13px", },
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
                  borderBottom: "0.5px solid grey",
                  padding: "2px 8px",
                  fontSize: "16px",
                }}
              >
                <p style={{ margin: "0px", flex: 2 }}> {props.data.name}</p>
                <p style={{ margin: "0px", flex: 1 }}> {props.data.quantity}</p>
                <p style={{ margin: "0px", flex: 1 }}> R{props.data.unitPrice}</p>
                <p style={{ margin: "0px", flex: 1 }}> R{props.data.salePrice}</p>
                <p style={{ margin: "0px", flex: 1 }}> {props.data.unitMeasurment}</p>
                <p style={{ margin: "0px", flex: 1 }}> {props.data.status}</p>
                <p style={{ margin: "0px", flex: 1 }}> R{props.data.total}</p>
             
              </div>
            );
          },
        }}
   
        style={{ borderRadius: "10px", boxShadow: "none",
    width: "100%" }}
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
        <p style={{ padding: "5px 0px" }}> R{total}</p>
      </div>
        </div>
    )
}

export default Available