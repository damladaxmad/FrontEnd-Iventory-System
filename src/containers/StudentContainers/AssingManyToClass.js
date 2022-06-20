import Modal from "../../Modal/Modal";
import { Button, Divider, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const AssignManyToClass = (props) => {
  const fasalo = useSelector((state) => state.allFasalo.fasalo);

  const [fasal, setFasal] = useState(fasalo[0]._id);
  const fasalHandler = (e) => {
    setFasal(e.target.value);
    // dispatch(setActiveClass(e.target.value));
  };

  const buttonHandler = () => {
    props.hideModal();
    axios.post(`/api/v1/students/${props.studentsIds}/${fasal}`).then((res) => {
        alert(res.data.message)
    });
  };

 
  return (
    <Modal onClose = {props.hideModal}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "15px"
        }}
      >
        <h2>Class Assignment </h2>
        <div style={{display: "flex", width: "300px"}}>
    
        <FormControl fullWidth>
          {/* <InputLabel>Gender</InputLabel> */}

          <Select
            style={{  height: "40px", color: "#B9B9B9" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={fasal}
            onChange={fasalHandler}
            //   label="Gender"
          >
            {fasalo.map((fasal, index) => (
              <MenuItem value={fasal._id} key={index}>
                {fasal.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </div>
        <Button
          style={{
            margin: "20px auto",
            width: "180px",
            backgroundColor: "#2F49D1",
          }}
          variant="contained"
          color="primary"
          onClick={buttonHandler}
        >
          Assign Student
        </Button>
      </div>
    </Modal>
  );
};

export default AssignManyToClass;
