"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/types/type";
const dashboard = () => {
  const { result } = useSelector((state: RootState) => state.bmiCalculator);

  return (
    <>
      <main>{result}</main>{" "}
    </>
  );
};

export default dashboard;
