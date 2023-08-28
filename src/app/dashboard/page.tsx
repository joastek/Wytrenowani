"use client";
import { PieChart } from "@mui/x-charts/PieChart";
import { useSelector } from "react-redux";
import { RootState } from "@/types/type";
import App from "@/components/TrainingPlan/test";
const dashboard = () => {
  const { result } = useSelector((state: RootState) => state.bmiCalculator);
  console.log(result);
  const data = [
    { label: "Group A", value: 400 },
    { label: "Group B", value: 300 },
    { label: "Group C", value: 300 },
    { label: "Group D", value: 200 },
  ];

  return (
    <>
      <main className="text-black bg-slate-100  h-24 w-screen text-right  dark:bg-secondary ">
        <div> </div>
        <div className="flex justify-center items-center  flex-col h-screen">
          <div className="h-64 w-full bg-slate-400 p-4 flex justify-center items-center">
            {result}
            <App />
            <PieChart
              series={[
                {
                  paddingAngle: 5,
                  innerRadius: 60,
                  outerRadius: 80,
                  data,
                },
              ]}
              margin={{ right: 5 }}
              width={200}
              height={200}
              legend={{ hidden: true }}
            />
          </div>
        </div>
      </main>{" "}
    </>
  );
};

export default dashboard;
