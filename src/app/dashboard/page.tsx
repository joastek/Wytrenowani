"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/types/type";
const dashboard = () => {
  const { result } = useSelector((state: RootState) => state.bmiCalculator);
  console.log(result);
  return (
    <>
      <main className="text-black bg-slate-100  h-24 w-full text-right">
        <div> </div>
        <div className="flex justify-center items-center  flex-col h-screen">
          <div className="h-64 w-full bg-slate-400 p-4 flex justify-center items-center">
            {result}
          </div>
        </div>
      </main>{" "}
    </>
  );
};

export default dashboard;
