import {
  Avatar,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import profile from "../assets/images/profileDrawer.jpg";
import Footer from "./Footer";
import DrawerFile from "./DrawerContainers/DrawerFile";
import AppBarFile from "./AppBarContainers/AppBar"
import { useSelector } from "react-redux";

const drawerWidth = 225;
const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#F0F2FA",
      width: "90%",
      marginTop: "90px",
      marginBottom: "50px"
    },
    toolbar: {
      display: "flex",
      flexDirection: "column"
    },
    root: {
      display: "flex",
      width: "100%"
    },
    drawer: {
      width: "50%",
      marginTop: "10px",
    },

    drawerPaper: {
      width: "50%",
      color: "#FFFFFF",
      fontSize: "5px",
      background: "#0061F7",
    },
    active: {
      borderRight: "2px solid white",
      height: "40px",
      padding: "0px 15px",
    },
    inActive: {
      opacity: 0.6,
      padding: "0px 15px",
      height: "40px",
    },
    title: {
      padding: theme.spacing(2),
      fontSize: 18,
      fontWeight: "700",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      color: "#041E42",
      backgroundColor: "#ffffff",
    },
    appBarTitle: {
      flexGrow: 1,
      fontWeight: "bold",
      fontSize: "26px",
    },
    avatar: {
      marginLeft: theme.spacing(2),
      cursor: "pointer",
    },

  };
});


const Layout = ({ children }) => {
  const classes = useStyles();
  const activeUser = useSelector(state => state.activeUser.activeUser)
  const [show, setShow] = useState(false)

  const handleShow = (location) => {
    if (location == "/") setShow(true)
    if (location !== "/") setShow(false)
  }

  return (
   
    <div className={classes.root} style={{ backgroundColor: "#f2f2f2" }}>
      
      {/* app bar */}
   <AppBarFile/>
   
      <DrawerFile show = {handleShow}/>


      <div className={classes.page}>
        <div className={classes.toolbar}>
          {children}  
          {show && <h2 style={{margin:"-5px 30px",}}>
            Hello {activeUser.name},  Welcome Back!!</h2>}
          {/* <Divider
            style={{
              backgroundColor: "#E0E1EA",
              marginTop: "40px",
            }}
          /> */}
          {/* <Footer />  */}
         
        </div>
      </div>
    </div>

  );
};

export default Layout;
