"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types/type";
const dashboard = () => {
  const { result } = useSelector((state: RootState) => state.bmiCalculator);

  return (
    <>
      {" "}
      <div className="w-24 h-64 bg-slate-400 ">{result}</div>{" "}
    </>
  );
};

export default dashboard;
