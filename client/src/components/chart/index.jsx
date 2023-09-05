import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ScatterChart,
  Scatter,
  LabelList,
  Label, // Import Label component
} from "recharts";
function getMaxY(data) {
  if (data.length === 0) {
    return undefined; // Handle an empty array
  }

  let maxY = data[0].y;
  for (let i = 1; i < data.length; i++) {
    if (data[i].y > maxY) {
      maxY = data[i].y;
    }
  }
  return maxY;
}

function getMinY(data) {
  if (data.length === 0) {
    return undefined; // Handle an empty array
  }

  let minY = data[0].y;
  for (let i = 1; i < data.length; i++) {
    if (data[i].y < minY) {
      minY = data[i].y;
    }
  }
  return minY;
}

function calculateMean(data) {
  if (data.length === 0) {
    return 0; // Handle the case where the array is empty to avoid division by zero.
  }

  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i].y;
  }

  const mean = sum / data.length;
  return mean;
}

const RenderLineChart = ({ data ,typeValue}) => {
  const [MAX_Y, setMAX_Y] = useState(getMaxY(data));
  const [MIN_Y, setMIN_Y] = useState(getMinY(data));
  const [MEAN_Y, setMEAN_Y] = useState(calculateMean(data));

  const unit = typeValue=="poids"||typeValue=="sap"? " g" : " N"
  useEffect(() => {
    setMAX_Y(getMaxY(data));
    setMIN_Y(getMinY(data));
    setMEAN_Y(calculateMean(data));
  }, [data]);

  return (
    // <ResponsiveContainer width="100%" height={"100%"}>
    //   <ScatterChart
    //     margin={{
    //       top: 20,
    //       right: 20,
    //       bottom: 20,
    //       left: 20,
    //     }}
    //   >
    //     <CartesianGrid />
    //     <XAxis type="category" dataKey="x" name="date"  />
    //     <YAxis
    //       type="number"
    //       dataKey="y"
    //       name="value"
    //       domain={[0, 50]}
    //     />
    //     <Tooltip cursor={{ strokeDasharray: "3 3" }} />
    //     <Scatter name="A school" data={data} fill="#8884d8" label>
    //       <LabelList dataKey="y" content={<CustomizedLabel />} />
    //     </Scatter>
    //     <ReferenceLine y={500} label={"Y=500"} stroke="red" />
    //   </ScatterChart>
    // </ResponsiveContainer>

    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        set
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" name="date" />
        <YAxis domain={[Math.floor(MIN_Y * 0.5), Math.floor(MAX_Y * 1.15)]} unit={unit} />
        <Tooltip />
        <Legend />
        {/* <Line
          type="monotone"
          dataKey="y"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        /> */}
        <Line
          type="monotone"
          dataKey="y"
          stroke="#82ca9d"
          dot={{ r: 6 ,fill:"#82ca9d"}}
          activeDot={{ r: 8 }}
          label={<CustomizedLabel />}
        />

        <ReferenceLine y={MAX_Y} stroke="red" label={`Max=${MAX_Y}`} />
        <ReferenceLine y={MIN_Y} stroke="red" label={`Min=${MIN_Y}`} />
        <ReferenceLine
          y={MEAN_Y}
          stroke="blue"
          label={`Moyen=${MEAN_Y.toFixed(2)}`}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const CustomizedLabel = (props) => {
  return (
    <text
      x={props.x}
      y={props.y}
      dy={-10}
      textAnchor="middle"
      fill="#8884d8" // Customize label text color
    >
      {props.value}
    </text>
  );
};

export default RenderLineChart;
