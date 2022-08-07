import MyModal from "../../Modal/Modal"
import MaterialTable from "material-table"
import { Divider } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProducts } from "../../redux/actions/productsActions";
import { setOrderList } from "../../redux/actions/orderListActions";
import React, {useState, useEffect} from "react";


const BrowsePurchases = (props) => {

  const dispatch = useDispatch()

  const products = useSelector(state => state.products.products)
  const purchaseList = useSelector(state => state.purchaseList.purchaseList)
  const [query, setQuery] = useState("");
  const [state, setState] = useState()

  const fetchProducts = async (status) => {
    const response = await axios
    .get("http://127.0.0.1:80/api/v1/products")
    .catch((err) => {
      alert(err.response.data.message);
    });
  dispatch(setProducts(response.data.data.products));   
};

  const rowClickHandler = (data) => {
    setQuery('')
    props.hideModal()
    if (!purchaseList.includes(JSON.stringify(data))){
      props.data(JSON.stringify(data))
    }   
  }

  useEffect(()=> {

  }, [purchaseList])

 useEffect(()=> {
  setState("Loading...")
  fetchProducts()
 }, [])

 useEffect(()=> {
  if (query != '') {
    setState("No matching products!")
  }
}, [query])

  const handler = (data) => { 
    if (query !== ""){
      if (data.length > 0) {
        return data.filter(
          (std) =>
          std.name.toLowerCase().includes(query)
        );
      } else {
        return
      } 
    }
    else return data
     
  };

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
   
        { title: "Product Name", field: "name", width: "4%",
        cellStyle: { border: "none"} },
        { title: "Product Price", field: "unitPrice", width: "4%",
        cellStyle: { border: "none"}, render: (data)=>
        <p> ${data.unitPrice}</p>}
      ]

      // const data = products

    return (
        <MyModal onClose = {props.hideModal}>
        <div>
        <input
          type="text"
          placeholder="Search Products"
          style={{
            width: "400px",
            height: "40px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "#EFF0F6",
            border: "none",
          }}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Divider style={{marginTop: "10px"}}/>
           <MaterialTable
        columns={columns}
        data={handler(products)}
        options={materialOptions}
        localization={{
          body: {
            emptyDataSourceMessage: state,
          },
        }}
        onRowClick={(event, rowData) => {
          rowClickHandler(rowData)
          }}
        style={{ borderRadius: "10px", boxShadow: "none",
        width: "100%", marginTop: "10px", background: "#F7F7F7",
        height: '300px',   overflowY: products.length < 5 ? "none" : "scroll" }}
      />
        </div>
        </MyModal>
    )
}

export default BrowsePurchases