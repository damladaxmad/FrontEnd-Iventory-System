import React from "react";
import { Typography, makeStyles } from "@material-ui/core";


const StagesChart = (props) => {
    let color = props.value.color
    return (
        <div
        style={{
          display: "flex",
        //   gap: "8px",
          marginTop: "30px",
          marginLeft: "25px",
          display: "flex", gap: "18px",
        }}
      >
        <div
          style={{
            width: "25px",
            height: "25px",
            backgroundColor: color,
            borderRadius: "50%",
          }}
        />
        <div style={{}}>
          <p
            style={{
              margin: "0px",
              fontSize: "18px",
              color: "#0061F7",
              fontWeight: "700",
            }}
          >
            {props.value.title}
          </p>
          <Typography
            style={{
              color: "rgba(0, 97, 247, 0.3)",
              margin: "0px",
              fontSize: "16px",
              fontWeight: "700",
            }}
          >
            {props.value.value}
          </Typography>
        </div>
      </div>
    )
}


export default StagesChart;