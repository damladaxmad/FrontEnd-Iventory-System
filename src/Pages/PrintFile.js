import './printFile.css';
import ReactToPrint from "react-to-print"
import React, { useRef } from 'react';


const PrintFile = () => {

    const componentRef = useRef();
    const data = {companyName: "Damlad Shop", saledBy: "Damlad Axmad",
    date: "2022/2/22", invoice: "invoice#2334",
    products: [{item: "Xanjo Kuleel", quantity: 3,
    price: 30, subTotal: 90, total: 100}]}

        return (
        <div>
            <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
        pageStyle = "a5"
      />
      {/* <ComponentToPrint ref={componentRef} /> */}
 <table className="body-wrap" ref={componentRef}>
                <tbody>
                    <tr>
                        <td></td>
                        <td className="container" width="600">
                            <div className="content">
                                <table className="main" width="100%" cellPadding="0" cellSpacing="0">
                                    <tbody>
                                        <tr>
                                            <td className="content-wrap aligncenter">
                                                <table width="100%" cellPadding="0" cellSpacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td className="content-block aligncenter">
                                                                <h2>{data.companyName}</h2>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="content-block">
                                                                <table className="invoice">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                Served By : {data.saledBy}
                                                                                <br />
                                                                                Invoice {data.invoice}
                                                                                <br />
                                                                                {data.date}
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <table className="invoice-items" cellPadding="0" cellSpacing="0">
                                                                                    <div style={{
                                                                                        display: "flex",
                                                                                        // justifyContent: "space-between",
                                                                                        // margin: "10px 0px",
                                                                                        // padding: "2px 0px",
                                                                                        // alignItems: "center",
                                                                                        // fontSize: 18,
                                                                                        // borderBottom: "1px solid grey",
                                                                                        // width: "100%",
                                                                                        flexDirection: "column"
                                                                                        }}>
                                                                                        {data.products.map((d) => (
                                                                                         <tr>
                                                                                            <td>{d.item}</td>
                                                                                            <p className="alignright">{d.quantity}</p>
                                                                                            <p className="alignright">R{d.price}</p>
                                                                                            <p className="alignright">R{d.subTotal}</p>
                                                                                        </tr>
                                                                                        ))}
                                                                                       
                                                                                    </div>

                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="content-block aligncenter">
                                                                Developed By Baroobo Comppany
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="content-block aligncenter">
                                                                Address, Mogadishu, Somali, Mell
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
           
        );
}  


export default PrintFile