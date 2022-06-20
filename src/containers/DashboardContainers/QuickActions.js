import React from "react";
import {  Typography } from "@material-ui/core";
import Actions from "./Actions";

const QuickActions = () => {
  
  const parentDivStyle = { background: "white", padding: "25px",
    borderRadius: "10px", height: "200px",
    width: "75%", float: "left",   boxShadow: "1px 1px 1px #9E9E9E"
  }

  return (
    <div
      style={parentDivStyle}
    >
      <Typography
        style={{ fontWeight: "600", fontSize: "24px", color: "#171717" }}
      >
        Quick Actions
      </Typography>
      <div style={{display: "flex", gap: "22px"}}>
      <Actions />
      <Actions />
      <Actions />
      <Actions />
      <Actions />
      </div>
      
    </div>
  );
};

export default QuickActions;
