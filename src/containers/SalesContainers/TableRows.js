import React, { useEffect, useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { setOrderList } from "../../redux/actions/orderListActions";

const TableRows = (props) => {

    const [quantity, setQuantity] = useState(1)
    const [unitPrice, setUnitPrice] = useState(props.value.salePrice)
    const [all, setAll] = useState({})
    const orderList = useSelector(state => state.orderList.orderList)
    const [force, setForce] = useState(1)

    const forceUpdate = () => {
      setForce(state => state + 1)
    }

    useEffect(() => {
      setUnitPrice(props.value.salePrice)
    }, [force])

    const dispatch = useDispatch()

    const quantityHandler = (e) => {
        setQuantity(parseInt(e?.target?.value))
        props.quantityFun(props.number, parseInt(e?.target?.value), props.value.name)
    }
    
    const unitPriceHandler = (e) => {
        setUnitPrice(parseInt(e?.target?.value))
        props.unitPriceFun(props.number, parseInt(e?.target?.value), props.value.name)
    }
    
    useEffect(()=> {
      props.quantityFun(props.number, quantity, props.value.name)
      props.unitPriceFun(props.number, unitPrice, props.value.name)
    }, [])

    useEffect(()=> {
        props.data({item: props.value.name, quantity: quantity,
            unitPrice: unitPrice})
        props.total(quantity * unitPrice)
    }, [quantity, unitPrice])

    const iconHandler = () => {
        let all = orderList
        all.splice(props.number, 1)
        dispatch(setOrderList(all))
        props.change()
        forceUpdate()
    }
   
    useEffect(()=> {
      return () => {

      }
    }, [])

    return (
  <div style={{display: "flex", gap:"30px", alignItems: "center"}}>
                <div style={{
                border: "1px solid #C7C7C7", padding: "8px",  borderRadius:"4px",
                fontSize:"16px", width: "300px"}}> 
                <p> {props.value.name}</p></div>
                <input
                name= "quantity"
                type= "number"
                onChange={(e)=>quantityHandler(e)}
                value= {quantity}
                style={{
                  width: "140px",
                  height: "40px",
                  marginLeft: "30px",
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
                  width: "140px",
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
              fontSize:"16px", width: "120px", marginLeft: "5px" }}> 
              <p> ${quantity * unitPrice}</p></div>
              <CloseIcon style = {{fontSize: "24px", marginLeft: "40px",
                cursor: "pointer"}} 
                onClick = {iconHandler}/>
              </div>
    )
  }

  export default TableRows