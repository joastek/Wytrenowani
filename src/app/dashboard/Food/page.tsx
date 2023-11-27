import Breakfast from "@/components/Food/SetBreakfastMeal";
import Dinner from "@/components/Food/SetDinnerMeal";
import Lunch from "@/components/Food/SetLunchMeal";
import CaloriesBar from "@/components/ProgressBars/Calories";
import ProteinBar from "@/components/ProgressBars/Protein";
import CarboBar from "@/components/ProgressBars/Carbo";
import FatBar from "@/components/ProgressBars/Fat";
import translate from "google-translate-api-x";

const Food = async () => {
  const res = await translate("jabłko", { to: "en" });

  return (
    <>
      <div className="flex   justify-center flex-row  ">
        {res.text}
        <div className="w-1/2 flex  justify-end mt-28  max-h-[50rem]">
          <table className="   w-full bg-bar rounded-[1rem] max-w-[70rem]   shadow-3xl">
            <thead className="">
              <tr className="flex m-6 p-4 rounded-[1rem] border-[0.4rem] border-bgcontrastpurple text-lg ">
                <th style={{ width: "40%" }} className="font-light">
                  <h2>Produkt</h2>
                </th>
                <th style={{ width: "15%" }} className="font-light">
                  <h2>Białko</h2>
                </th>
                <th style={{ width: "20%" }} className="font-light">
                  <h2>Węglowoadny</h2>
                </th>
                <th style={{ width: "15%" }} className="font-light">
                  <h2>Tłuszcze</h2>
                </th>
                <th style={{ width: "15%" }} className="font-light">
                  <h2>Kcal</h2>
                </th>
              </tr>
            </thead>

            <tbody>
              <div className=" overflow-y-auto border-[0.4rem] border-bgcontrastpurple  max-h-[50rem]   m-6 rounded-[1rem]">
                <Breakfast />
                <Dinner />
                <Lunch />
              </div>
            </tbody>
          </table>
        </div>
        <div className="flex flex-col  w-1/2    mt-28   rounded-lg ml-6  max-w-[30rem] max-h-[52rem]">
          <div className="w-1/2 flex flex-col h-1/3 items-center bg-bar p-6 mr-5    rounded-[2rem]  shadow-3xl">
            <h3 className="mb-4">Suma kcal:</h3>
            <CaloriesBar />
          </div>

          <div className=" w-1/2 max-h-[2/3] items-center justify-center flex flex-col bg-bar  rounded-[2rem] mt-6 p-6  shadow-3xl">
            <div className="h-1/3 w-[8rem]  flex flex-col  items-center  mb-6">
              <h4 className="">Suma białka:</h4>
              <ProteinBar />
            </div>{" "}
            <div className=" h-1/3 w-[8rem]  flex flex-col  items-center  mb-6">
              <h4 className=" text-center">Suma węglowodanów: </h4>
              <CarboBar />
            </div>
            <div className=" h-1/3 w-[8rem]  flex flex-col  items-center mb-6">
              <h4 className="mt-4">Suma tłuszczy:</h4>
              <FatBar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Food;
