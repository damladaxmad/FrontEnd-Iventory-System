import React, { useEffect, useState } from "react"
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import { setOrderList } from "../../redux/actions/orderListActions";
import { setPurchaseList } from "../../redux/actions/purchaseListActions";

const TableRows = (props) => {

    const [quantity, setQuantity] = useState(1)
    const [unitPrice, setUnitPrice] = useState(props.value.unitPrice)
    const [salePrice, setSalePrice] = useState(props.value.salePrice)
    const [all, setAll] = useState({})
    const purchaseList = useSelector(state => state.purchaseList.purchaseList)
    const [force, setForce] = useState(1)

    const forceUpdate = () => {
      setForce(state => state + 1)
    }

    useEffect(() => {
      setSalePrice(props.value.salePrice)
    }, [force])

    const dispatch = useDispatch()

    const quantityHandler = (e) => {
        setQuantity(parseInt(e?.target?.value))
        props.quantityFun(props.number, parseInt(e?.target?.value), props.value.name)
    }
    
    const unitPriceHandler = (e) => {
        setUnitPrice(parseInt(e?.target?.value))
        props.unitPriceFun(props.number, parseFloat(e?.target?.value),
        parseFloat(props.value.unitPrice), props.value.name)
    }

    const salePriceHandler = (e) => {
      setSalePrice(parseInt(e?.target?.value))
      props.salePriceFun(props.number, parseFloat(e?.target?.value), props.value.name)
  }
    
    useEffect(()=> {
      props.quantityFun(props.number, quantity, props.value.name)
      props.unitPriceFun(props.number, unitPrice, parseFloat(props.value.unitPrice), props.value.name)
      props.salePriceFun(props.number, salePrice, props.value.name)

    }, [])

    useEffect(()=> {
        props.data(props.value.unitPrice)
        props.total(quantity * unitPrice)
    }, [quantity, unitPrice])

    const iconHandler = () => {
        let all = purchaseList
        all.splice(props.number, 1)
        dispatch(setPurchaseList(all))
        props.change()
        forceUpdate()
    }
   
    useEffect(()=> {
      return () => {

      }
    }, [])

    return (
  <div style={{display: "flex", gap:"30px", alignItems: "center", width: "100%"}}>
                <div style={{
                border: "1px solid #C7C7C7", padding: "8px",  borderRadius:"4px",
                fontSize:"16px", width: "30.3%"}}> 
                <p> {props.value.name}</p></div>
                
                <div style={{background: "#F0F2FA",
                border: "1px solid #C7C7C7", padding: "8px", fontWeight:"bold", borderRadius:"4px",
                fontSize:"16px", width: "12%", marginLeft: "0px" }}>
                <p> {props.value.quantity ? props.value.quantity : "0"}  </p>
                </div>

                <input
                name= "quantity"
                type= "number"
                onChange={(e)=>quantityHandler(e)}
                value= {quantity}
                style={{
                  width: "15%",
                  height: "40px",
                  marginLeft: "25px",
                  padding: "15px",
                  fontSize: "16px",
                  border: "1px solid #C7C7C7",
                  borderRadius: "6px",
                }}
              /> 
              <input
                name= "unitPrice"
                type= "number"
                onChange={(e)=>unitPriceHandler(e)}
                value= {unitPrice}
                style={{
                  width: "15%",
                  height: "40px",
                  padding: "15px",
                  fontSize: "16px",
                  marginLeft: "5px",
                  border: "1px solid #C7C7C7",
                  borderRadius: "6px",
                }}
              /> 

              <input
                name= "salePrice"
                type= "number"
                onChange={(e)=>salePriceHandler(e)}
                value= {salePrice}
                style={{
                  width: "15%",
                  height: "40px",
                  padding: "15px",
                  fontSize: "16px",
                  marginLeft: "5px",
                  border: "1px solid #C7C7C7",
                  borderRadius: "6px",
                }}
              /> 

              <div style={{background: "#F0F2FA",
              border: "1px solid #C7C7C7", padding: "8px", fontWeight:"bold", borderRadius:"4px",
              fontSize:"16px", width: "15%", marginLeft: "5px" }}>
              <p> {!Number.isNaN(unitPrice*quantity) ? `R${unitPrice*quantity}` : 0}  </p></div>
              <CloseIcon style = {{fontSize: "24px", marginLeft: "40px",
                cursor: "pointer"}} 
                onClick = {iconHandler}/>
              </div>
    )
  }

  export default TableRows