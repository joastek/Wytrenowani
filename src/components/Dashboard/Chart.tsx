"use client";
import { Weight } from "@/types/type";
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";
interface PagecontentProps {
  weight: Weight[];
}
const Chart: React.FC<PagecontentProps> = ({ weight }) => {
  if (weight.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center text-center text-2xl">
        {" "}
        Brak pomiarów wagi
      </div>
    );
  }
  const data = weight
    .slice()
    .reverse()
    .map((weightItem) => ({
      name: weightItem.date, // Replace 'name' with the date from 'weightItem'
      waga: weightItem.weight, // Assuming 'uv' represents weight in your context
      // pv: weightItem.date,
    }));
  const maxYWeight = Math.max(...weight.map((item) => item.weight));
  const minYWeight = Math.min(...weight.map((item) => item.weight));
  const maxYValue = Math.floor(maxYWeight * 1.05);
  const minYValue = Math.floor(minYWeight * 0.95);
  return (
    <>
      <div className="flex justify-center items-center  flex-col">
        {" "}
        <AreaChart
          width={530}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis domain={[minYValue, maxYValue]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="waga"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          {/* <Area
            type="monotone"
            dataKey="name"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          /> */}
        </AreaChart>
      </div>
    </>
  );
};

export default Chart;
