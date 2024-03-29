import WaterFill from "@/components/ProgressBars/WaterFill";
import NumberOfSteps from "@/components/ProgressBars/NumberOfSteps";
import "@/styles/DashboardWave.css";
import "@/styles/theme.css";
import MotivationalQuotes from "@/components/Dashboard/MotivationalQuotes";
import "react-circular-progressbar/dist/styles.css";
import { BiRefresh } from "react-icons/bi";
import CaloriesBar from "@/components/ProgressBars/Calories";
import getWeight from "@/actions/getWeight";
import Chart from "@/components/Dashboard/Chart";
import WeatherBox from "@/components/Dashboard/WeatherBox";
import Sidebar from "@/components/Dashboard/Sidebar";

const dashboard = async () => {
  const weight = await getWeight();

  console.log("1");
  return (
    <>
      <div className="container text-white ">
        <div className="sm:mx-4">
          <div className="columns mx-1 pt-12 ">
            <div className="column is-full  sm:my-8 box-inner bg-bar border-4 border-contrast  shadow-3xl">
              <div className="h-[15rem] ">
                <MotivationalQuotes />
              </div>
            </div>
          </div>
          <div className="columns ">
            <div className="column is-3 bg-bar  rounded-[1rem]  m-4 border-4 border-contrast  shadow-3xl justify-center text-center">
              {" "}
              <CaloriesBar />
            </div>
            <div className="column m-4  rounded-[1rem] border-4 border-contrast  shadow-3xl">
              {" "}
              <WeatherBox />
            </div>
            <div className="column   m-2 ">
              <div className="   p-4 rounded-[1rem] border-4 border-contrast  shadow-3xl">
                {" "}
                <WaterFill />{" "}
              </div>
              <div className=" p-4 mt-4 rounded-[1rem] border-4 border-contrast  shadow-3xl ">
                {" "}
                <NumberOfSteps />
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className=" bg-bar  rounded-[1rem] border-4 border-contrast  shadow-3xl">
                <Chart weight={weight} />
              </div>
            </div>
            <div className="column">
              <div className=" bg-bar  rounded-[1rem] border-4 border-contrast  shadow-3xl">
                <Chart weight={weight} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default dashboard;
<div className="    mt-28 mr-8 justify-start">
  {" "}
  <div className="bg-bgcontrastpurple  max-w-[35rem] max-h-[3/4] rounded-[1rem] p-4 ml-6  shadow-3xl">
    {/* <AuthAndCalendarManagement /> */}
  </div>
  <div className="bg-bgcontrastpurple  max-w-[35rem] max-h-[1/4] rounded-[1rem] p-4 ml-6  mt-4  shadow-3xl">
    {/* <AuthAndCalendarManagement /> */}
  </div>
</div>;
