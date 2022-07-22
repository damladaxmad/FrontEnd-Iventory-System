import React from "react";
import { Avatar, Typography, makeStyles } from "@material-ui/core";
import { IoMdStats } from "react-icons/io";
import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
  return {
    avatar: {
      marginLeft: theme.spacing(2),
      cursor: "pointer",
      backgroundColor: "#F0F2FA",
    },
  };
});

const StatCard = (props) => {
  const classes = useStyles();

  return (
      
    <div
      style={{
        width: "236.5px",
        height: "95px",
        background: "#FFFFFF",
        borderRadius: "10px",
        padding: "40px 5px",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        gap: "8px",
        boxShadow: "1px 1px 1px #9E9E9E"
      }}
    >
      <Avatar className={classes.avatar}>
        <IoMdStats style={{ color: "#2F49D1" }} />
      </Avatar>
      <div>
        <p
          style={{
            margin: "0px",
            fontSize: "16px",
            color: "#171717",
            fontWeight: "600",
          }}
        >
          { props.value.isMoney ? 
          props.value.value < 0 ? `-R${props.value.value*-1}` : `R${props.value.value}`
        : props.value.value}
        </p>
        <Typography
          style={{
            color: "#B9B9B9",
            margin: "0px",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          {props.value.label}
        </Typography>
      </div>
    </div>
  );
};

export default StatCard;
