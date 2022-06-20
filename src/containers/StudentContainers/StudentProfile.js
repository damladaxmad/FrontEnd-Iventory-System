import React from "react";
import { useFormik } from "formik";
import { TextField, Button, Avatar, Typography } from "@mui/material";
import profile from "../../assets/images/blueProfile.webp";
import UpperProfile from "./UpperProfile";
import InfoContainer from "./InfoContainer";

const StudentProfile = () => {
  const studentName = "Damlad Axmad Dasar";
  const bio = "A graduated student";
  const infos = [
    {
      infoName: "Contact Info",
      infoData: [
        { label: "Student Name", value: "Caaqil Cumar Axmad" },
        { label: "Student Email", value: "caaqil@gmail.com" },
        { label: "Student Phone", value: "0615753832" },
        
      ],
    },
    {
      infoName: "Finance Info",
      infoData: [
        { label: "Student Name", value: "Caaqil Cumar Axmad" },
        { label: "Student Email", value: "caaqil@gmail.com" },
        { label: "Student Phone", value: "0615753832" },
      ],
    },
    {
      infoName: "Exam Info",
      infoData: [
        { label: "Student Name", value: "Caaqil Cumar Axmad" },
        { label: "Student Email", value: "caaqil@gmail.com" },
      ],
    },
    
  ];

  infos.map((data) => {
    console.log(data.infoName)
  })

  return (
    <div
      style={{
        height: "100%",
        width: "95%",
        margin: "0px auto",
        marginTop: "20px",
        display: "flex",
        gap: "14px",
        background: "white",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "10px",
        padding: "16px",
      }}
    >
      <UpperProfile image={profile} name={studentName} bio={bio} />
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          marginTop: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "40px",
        }}
      >
       
         {  infos.map((data) => (
          <InfoContainer infoName= {data.infoName}
          infoData = {data.infoData}  />
  ))} 
      
      </div>
    </div>
  );
};


export default StudentProfile;
