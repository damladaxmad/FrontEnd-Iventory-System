import React from "react";
import { Avatar, Typography, makeStyles } from "@material-ui/core";
import StagesChart from "./StagesChart";
import { VictoryPie, VictoryContainer } from "victory";

const myData = [
  { x: "primary", y: 900 },
  { x: "secondary", y: 300 },
  { x: "others", y: 400 },
];

const Chart = () => {

  const parentDivStyle = { background: "white", padding: "20px",
    borderRadius: "10px", height: "350px", boxShadow: "1px 1px 1px #9E9E9E",
    display: "flex", gap: "100px", alignItems: 'center'
  }

  const secondary = {
    color: "#F2994A",
    title: "Secondary School",
    value: "4,55",
  };
  const primary = { color: "#0061F7", title: "Primary School", value: "2,55" };
  const others = { color: "#F5EFFF", title: "Others", value: "1,55" };


  return (
    <div
      style={parentDivStyle}
    >

      <div>
        <Typography
          style={{ minWidth: '360px', fontWeight: "600", fontSize: "20px", color: "#0061F7" }}
        >
          Students By Educational Stage
        </Typography>

        <StagesChart value={primary} />
        <StagesChart value={secondary} />
        <StagesChart value={others} />
      </div>

      <div>
        <VictoryPie
          data={myData}
          colorScale={["#0061F7", " #F5EFFF", "#F2994A"]}
          radius={147}
          labels={() => null}
          animate={{
            animationWhitelist: ["style", "data", "size"], // Try removing "size"
            onExit: {
              duration: 500,
              before: () => ({ opacity: 0.3, _y: 0 }),
            },
            onEnter: {
              duration: 500,
              before: () => ({ opacity: 0.3, _y: 0 }),
              after: (datum) => ({ opacity: 1, _y: datum._y }),
            },
          }}
          containerComponent={
            <VictoryContainer
              responsive={false}
            />
          }
        />
      </div>
    </div>
  );
};

export default Chart;
