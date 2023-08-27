"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/types/type";
import App from "@/components/TrainingPlan/test";
const dashboard = () => {
  const { result } = useSelector((state: RootState) => state.bmiCalculator);
  console.log(result);
  return (
    <>
      <main className="text-black bg-slate-100  h-24 w-screen text-right  dark:bg-secondary ">
        <div> </div>
        <div className="flex justify-center items-center  flex-col h-screen">
          <div className="h-64 w-full bg-slate-400 p-4 flex justify-center items-center">
            {result}
            <App />
          </div>
        </div>
      </main>{" "}
    </>
  );
};

export default dashboard;
