import React from "react";
import { Avatar, Typography, makeStyles } from "@material-ui/core";
import { MdPersonAddAlt1 } from "react-icons/md";
import { useSelector } from "react-redux";

const parentDivStyle = { width: "110px", height: "100px",
backgroundColor: "#F2994A", borderRadius: "10px", display: "flex",
justifyContent: "center", flexDirection: "column",
alignItems: "center", color: "white", cursor: "pointer",
gap: "5px", marginTop: "10px"
}

const Actions = () => {
 
  const activeUser = useSelector(state => state.activeUser.activeUser)
  
  return (
    <div>
      <div
        style={parentDivStyle}
        onClick = {()=> {
          if (activeUser.privillages.includes("Quick Actions")) alert("It does")
          else {alert("You don't have access")}
        }}
      >
        <MdPersonAddAlt1 style={{ fontSize: "45px", fontWeight: "bold" }} />
        <Typography style={{ fontSize: "12px" }}>New Student</Typography>
      </div>
    </div>
  );
};

export default Actions;
