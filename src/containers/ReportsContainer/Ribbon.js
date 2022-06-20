import React, { useState } from "react";
import {FiPrinter} from "react-icons/fi"
import {GrChapterNext} from "react-icons/gr"
import {GrChapterPrevious} from "react-icons/gr"
import { FormControl, Select, MenuItem, Menu } from "@mui/material";

const Ribbon = () => {
    const statusArr = ["All", "Active", "Inactive"]
    const [status, setStatus] = useState(statusArr[0]);
  
    const statusHandler = (e) => {
      setStatus(e.target.value)
    }

    return (
        <div style={{background: "white", height: "50px",
        display: "flex", flexDirection: "row", gap: "20px",
        padding: "10px", width: "100%",
        alignItems: "center", justifyContent: "space-around"}}>

          <div style={{display: "flex", flexDirection: "row",
          gap: "20px"}}>
          <FiPrinter style = {{fontSize: "20px", cursor: "pointer"}}/>
          <GrChapterPrevious style = {{fontSize: "20px", cursor: "pointer"}}/>
          <GrChapterNext style = {{fontSize: "20px", cursor: "pointer"}}/>
          <p style={{color: "#B9B9B9", margin: "0px"}}> 1/4</p>
          </div>

          <div style={{display: "flex", flexDirection: "row",
          gap: "20px", alignItems: "center"}}>
          <p style={{fontWeight: "600", margin: "0px",
            fontSize: "16px"}} > From:</p>
          <input
          type="text"
          placeholder="From Data"
          style={{
            width: "200px",
            height: "35px",
            padding: "10px",
            fontSize: "14px",
            borderRadius: "8px",
            background: "#EFF0F6",
            border: "none",
          }}
          // onChange={(e) => setQuery(e.target.value)}
        />

          <p style={{fontWeight: "600", margin: "0px",
            fontSize: "16px"}} > To:</p>
          <input
          type="text"
          placeholder="To Data"
          style={{
            width: "200px",
            height: "35px",
            padding: "10px",
            fontSize: "14px",
            borderRadius: "8px",
            background: "#EFF0F6",
            border: "none",
          }}
          // onChange={(e) => setQuery(e.target.value)}
        />
        </div>

          <div style={{display: "flex", flexDirection: "row",
          gap: "20px"}}>
          <FormControl style={{ padding: "0px", margin: "0px" }}>
          <Select
            style={{  height: "35px", color: "#B9B9B9",
            width: "150px", }}
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
            style={{  height: "35px", color: "#B9B9B9",
            width: "150px", }}
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
            style={{  height: "35px", color: "#B9B9B9",
            width: "150px", }}
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

    )
}

export default Ribbon