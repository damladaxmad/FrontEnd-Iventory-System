import MyModal from "../Modal/Modal"
import MaterialTable from "material-table"
import { Divider } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProducts } from "../redux/actions/productsActions";
import { setOrderList } from "../redux/actions/orderListActions";
import React, {useState, useEffect} from "react";
import { constants } from "../Helpers/constantsFile";
import useFetch from "../funcrions/DataFetchers";


const BrowseProducts = (props) => {

  const dispatch = useDispatch()

  let products = useSelector(state => state.products.products)
  const orderList = useSelector(state => state.orderList.orderList)
  const [query, setQuery] = useState("");
  const [state, setState] = useState()
  const [my, setMy] = useState()

  const fetchProducts = async() => {
    axios.get(`${constants.baseUrl}/products`).then(res => {
      dispatch(setProducts(res.data.data.products))
    })
  }


  const rowClickHandler = (data) => {
    if (data.quantity < 1) return alert(`${data.name} is not available`)
    setQuery('')
    props.hideModal()
    if (!orderList.includes(JSON.stringify(data))){
      props.data(JSON.stringify(data))
    }   
  }

  useEffect(()=> {

  }, [orderList])

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
      if (data?.length > 0) {
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
        { title: "Available", field: "quantity",
        cellStyle: { border: "none"} },
        { title: "Product Price", field: "unitPrice", width: "4%",
        cellStyle: { border: "none"}, render: (data)=>
        <p> {constants.moneySign}{data.unitPrice}</p>}
      ]

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
        height: '300px',   
        overflowY: products?.length < 5 ? "none" : "scroll"
      }}
      />
        </div>
        </MyModal>
    )
}

export default BrowseProducts