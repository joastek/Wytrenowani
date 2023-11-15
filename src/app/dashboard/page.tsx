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
////

const dashboard = async () => {
  const weight = await getWeight();
  return (
    <>
      <div className="flex justify-center   w-full  ">
        <div className="flex  flex-wrap max-w-[70rem] mt-28  sm-28 md:max-w-[40rem]">
          <div className="bg-bar w-[70rem] h-[17rem]  rounded-[1rem] relative  shadow-3xl">
            <div className="box">
              <MotivationalQuotes />
              <div className="box-inner"></div>
            </div>
          </div>{" "}
          <div className="w-[20rem] max-h-[17rem]  bg-contrastblack rounded-[1rem] mt-6 justify-center flex flex-row text-center shadow-3xl">
            <CaloriesBar />
          </div>
          <div className="w-[27rem] weather_box  ml-6 mt-6  rounded-[1rem]  shadow-3xl p-2 flex justify-center text-center relative">
            {" "}
            <button className="absolute left-4 top-4">
              <BiRefresh className=" w-[2rem] h-[2rem]" />
            </button>
            <WeatherBox />
          </div>
          <div className="w-[20rem] block ml-6 mt-6">
            <div className="h-[7.75rem] bg-bgcontrastpurple flex p-4  rounded-[1rem]  shadow-3xl ">
              <WaterFill />
            </div>
            <div className="h-[7.75rem] bg-bgcontrastpurple mt-4 p-4 rounded-[1rem]  shadow-3xl">
              {" "}
              <NumberOfSteps />
            </div>
          </div>
          <div className="flex h-[17rem] w-full mt-6  ">
            {" "}
            <div className=" bg-bar  w-1/2 rounded-[1rem] relative  shadow-3xl p-4">
              <Chart weight={weight} />
            </div>{" "}
            <div className=" bg-bar  w-1/2  ml-6 rounded-[1rem] relative  shadow-3xl  p-4">
              {" "}
              dwadwad
            </div>
          </div>
        </div>
        <div className="    mt-28 mr-8 justify-start">
          {" "}
          <div className="bg-bgcontrastpurple  max-w-[35rem] max-h-[3/4] rounded-[1rem] p-4 ml-6  shadow-3xl">
            {/* <AuthAndCalendarManagement /> */}
          </div>
          <div className="bg-bgcontrastpurple  max-w-[35rem] max-h-[1/4] rounded-[1rem] p-4 ml-6  mt-4  shadow-3xl">
            {/* <AuthAndCalendarManagement /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default dashboard;
