"use client";
import Breakfast from "@/components/Food/SetBreakfastMeal";
import Dinner from "@/components/Food/SetDinnerMeal";
import Lunch from "@/components/Food/SetLunchMeal";
import CaloriesBar from "@/components/ProgressBars/Calories";
import ProteinBar from "@/components/ProgressBars/Protein";
import CarboBar from "@/components/ProgressBars/Carbo";
import FatBar from "@/components/ProgressBars/Fat";
import translate from "google-translate-api-x";
import { useState } from "react";

const Food = () => {
  return (
    <>
      <div className="mt-8">
        <div className="container rounded-[1rem] border-4 border-contrast shadow-3xl p-4">
          <div className="columns">
            <div className="column is-two-thirds rounded-[1rem] ">
              {" "}
              <table className="   w-full  rounded-[1rem] max-w-[70rem]  ">
                <thead>
                  <tr className="flex mx-2 p-4 text-white border-4 border-contrast rounded-[1rem] text-lg ">
                    <th
                      style={{ width: "40%" }}
                      className="font-bold text-white"
                    >
                      <h2>Produkt</h2>
                    </th>
                    <th
                      style={{ width: "15%" }}
                      className="font-bold text-white"
                    >
                      <h2>Białko</h2>
                    </th>
                    <th
                      style={{ width: "20%" }}
                      className="font-bold text-white"
                    >
                      <h2>Węglowoadny</h2>
                    </th>
                    <th
                      style={{ width: "15%" }}
                      className="font-bold text-white"
                    >
                      <h2>Tłuszcze</h2>
                    </th>
                    <th
                      style={{ width: "15%" }}
                      className="font-bold text-white"
                    >
                      <h2>Kcal</h2>
                    </th>
                  </tr>
                </thead>{" "}
                <tbody>
                  <Breakfast />
                  {/* <Dinner />
                  <Lunch />{" "} */}
                </tbody>
              </table>
            </div>
            <div className="column is-4 h-full ">
              {" "}
              <div className=" items-center bg-bar    p-2 border-4 border-contrast shadow-3xl rounded-[1rem]">
                <h3 className="mb-4">Suma kcal:</h3>
                <CaloriesBar />
              </div>
              <div className="  max-h-[2/3] items-center justify-center flex flex-col bg-bar mt-6   p-2 border-4 border-contrast shadow-3xl rounded-[1rem]">
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
        </div>
      </div>
    </>
  );
};

export default Food;
