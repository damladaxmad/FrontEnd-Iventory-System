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
    

    const columns = [
   
        { title: "Product Name", field: "name" , width: "8%",},
        { title: "Unit Price", field: "unitPrice"},
        { title: "Sale Price", field: "salePrice"},
        { title: "unitMeasurment", field: "unitMeasurment"},
        { title: "status", field: "status"},
        { title: "total", field: "total"},
        
      ];
    return (
        <div style={{width: "93%", margin: "30px auto", background: "white",
        pading: "20px", gap: "20px", display: "flex", flexDirection: "column",
        borderRadius: "10px",
        alignItems: "center"}}>
            <h2 style = {{marginTop: "20px"}}> Available Products</h2>
             <MaterialTable
        columns={columns}
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
          sorting: false,
          showTextRowsSelected: false,
          toolbar: false,
          pageSizeOptions: [2, 5, 8, 10, 20, 25, 50, 100],
          pageSize: 8,
          draggable: false,
          actionsColumnIndex: -1,
          headerStyle: { background: "#EFF0F6", fontSize: "13px", },
        }}
   
        style={{ borderRadius: "10px", boxShadow: "none",
    width: "100%" }}
      />
        </div>
    )
}

export default Available