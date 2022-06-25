import React, { useState, useEffect, useReducer } from "react"
import { FormControl, MenuItem, Menu} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "@mui/material";
import UsersTable from "./UsersTable";
import axios from "axios";
import { setUsers } from "../../../redux/actions/usersActions";

const Users = () => {
  const dispatch = useDispatch();

  const parentDivStyle = { display: "flex", alignItems: "center",
    justifyContent: "space-between",  gap: "0px", padding: "20px",
    background: "white", width: "98%", margin: "auto",
    marginTop: "20px", borderRadius: "8px 8px 0px 0px",
  }

  const searchStyle = { width: "400px", height: "40px",
    padding: "10px", fontSize: "16px", borderRadius: "8px",
    background: "#EFF0F6", border: "none",
  }

  const selectStyle = {  height: "40px", color: "#B9B9B9",
  width: "150px"}

  const statusArr = ["All", "Active", "Inactive"]
    const [status, setStatus] = useState(statusArr[0]);
    const [query, setQuery] = useState("");
    const users = useSelector((state) => state.users.users);
    const [force, setForce] = useState(1)

    const change = () => {
      setForce(state => state + 1)
    }
  const statusHandler = (e) => {
    setStatus(e.target.value)
  }

  
  const fetchUsers = async () => {
    const response = await axios
      .get("/api/v1/users")
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(setUsers(response.data.data.users));
  };

  const handler = (data) => { 
    if (data.length > 0) {
      return data.filter(
        (std) =>
        std.username.toLowerCase().includes(query) ||
        std.name.toString().toLowerCase().includes(query)
      );
    } else {
      return
    }  
  };

  useEffect(()=> {
    fetchUsers()
  }, [force])

   
  return (
<>
    <div
    style={parentDivStyle}
  >
    <input
      type="text"
      placeholder="Search"
      style={searchStyle}
      onChange={(e) => setQuery(e.target.value)}
    />
    <div style={{ display: "flex", gap: "20px", }}>
    <FormControl style={{ padding: "0px", margin: "0px" }}>
      <Select
        style={selectStyle}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={status}
        onChange={statusHandler}
      >
        {statusArr.map((status, index) => (
          <MenuItem value={status} key={index}>
            {status}
          </MenuItem>
        ))}
      </Select>
      </FormControl>
      <FormControl style={{ padding: "0px", margin: "0px" }}>
      <Select
        style={selectStyle}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={status}
        onChange={statusHandler}
      >
        {statusArr.map((status, index) => (
          <MenuItem value={status} key={index}>
            {status}
          </MenuItem>
        ))}
      </Select>
      </FormControl>

    </div>

  </div>
      <UsersTable data = {handler(users)}
      change = {change}/>
      </>

  )
        }

  export default Users