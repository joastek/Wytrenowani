"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/types/type";
import { useState, useEffect } from "react";
import Breakfast from "@/components/Food/SetBreakfastMeal";
import Dinner from "@/components/Food/SetDinnerMeal";
import Lunch from "@/components/Food/SetLunchMeal";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Food = () => {
  const { totalProtein, totalCarbo, totalFat, totalCalories } = useSelector(
    (state: any) => state.nutriensSum
  );

  const { calories, result, mass } = useSelector(
    (state: RootState) => state.bmiCalculator
  );

  ///nutriens circles
  const Protein = Math.ceil(1.8 * mass);
  const Fat = Math.ceil(0.6 * mass);
  const ProteinGrammeToCalories = Protein * 4;
  const FatGrammeToCalories = Fat * 9;
  const Carbo = Math.ceil(
    (calories - ProteinGrammeToCalories - FatGrammeToCalories) / 4
  );

  const percentage = 66;

  ///API

  const [breakfastNutrien, setbreakfastNutrien] = useState("");
  const [nameOfNutrien, setNameOfNutrien] = useState("");
  const [caloriesNutrien, setCaloriesNutrien] = useState("");
  const apiKey = "rTU4Ta3bWeja9oPWfA0LhQ==1lRq3dJcu6pA0IT4";
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  };

  const apiURL =
    "https://api.api-ninjas.com/v1/nutrition?query=" + nameOfNutrien;

  useEffect(() => {
    // Monitoruj zmiany breakfastNutrien i aktualizuj nameOfNutrien tylko wtedy, gdy breakfastNutrien zostanie zmieniony
    setNameOfNutrien(breakfastNutrien);
  }, [breakfastNutrien]);

  async function getNutriens() {
    const response = await fetch(apiURL, options);
    const data = await response.json();
    let caloriesNutrien = data[0].calories;
    setCaloriesNutrien(caloriesNutrien);
  }

  const handleInputChange = (event: any) => {
    setbreakfastNutrien(event.target.value);
  };
  return (
    <>
      <div className="flex justify-center items-center  flex-col  ">
        <div className="w-[70rem] justify-center items-center relative ">
          <table className="   w-full bg-bar rounded-lg   ">
            <thead className="">
              <tr className="flex m-6 p-4 rounded-lg border-[0.4rem] border-secondary text-lg ">
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
              <input
                type="text"
                onChange={handleInputChange}
                value={breakfastNutrien}
              />
              <button onClick={getNutriens}>Kliknij</button>

              <div>{breakfastNutrien}</div>
              <div>{caloriesNutrien}</div>
              <div className="overflow-y-auto h-[40rem] border-[0.4rem] border-secondary p-4 m-6 rounded-lg">
                <Breakfast />
                <Dinner />
                <Lunch />
              </div>
            </tbody>
          </table>
        </div>

        <div className="flex   w-[70rem]  mt-[2rem]  items-stretch    rounded-lg">
          <div className="w-1/3">
            <div className=" flex flex-col  items-center bg-bar p-6 mr-5   rounded-lg">
              <h3 className="mb-4">Suma kcal :</h3>
              <CircularProgressbar
                value={totalCalories}
                maxValue={calories}
                text={` \n ${totalCalories}/${calories} kcal`}
                styles={buildStyles({
                  textColor: "white",
                  textSize: "0.7rem",
                  pathColor: `rgb(87, 204, 153, ${percentage / 100})`,
                })}
              />
            </div>
          </div>
          <div className="w-2/3 flex items-center justify-center  bg-bar  rounded-lg">
            <div className=" w-[14rem] h-[16rem] flex flex-col  items-center mr-6 ">
              <h4 className="mb-4">Suma białka :</h4>
              <CircularProgressbar
                value={totalProtein}
                maxValue={Protein}
                text={` \n ${totalProtein}/${Protein} kcal`}
                styles={buildStyles({
                  textColor: "white",
                  textSize: "0.6rem",
                  pathColor: `rgb(18, 113, 255, ${percentage / 100}`,
                })}
              />{" "}
            </div>{" "}
            <div className=" w-[14rem] h-[16rem] flex flex-col  items-center mr-6">
              <h4 className="mb-4">Suma węglowodanów :</h4>
              <CircularProgressbar
                value={totalCarbo}
                maxValue={Carbo}
                text={` \n ${totalCarbo}/${Carbo} kcal`}
                styles={buildStyles({
                  textColor: "white",
                  textSize: "0.6rem",
                  pathColor: `rgb(221, 74, 255, ${percentage / 100}`,
                })}
              />
            </div>
            <div className=" w-[14rem] h-[16rem] flex flex-col  items-center">
              <h4 className="mb-4">Suma tłuszczy :</h4>
              <CircularProgressbar
                value={totalFat}
                maxValue={Fat}
                text={` \n ${totalFat}/${Fat} kcal`}
                styles={buildStyles({
                  textColor: "white",
                  textSize: "0.6rem",
                  pathColor: `rgb(200, 50, 50, ${percentage / 100}`,
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Food;
