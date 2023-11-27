"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateNumberOfSteps } from "@/slice/Dashboard/numberOfSteps";
import TextField from "@mui/material/TextField";
const NumberOfSteps = () => {
  const NumberOfSteps = useSelector(
    (state: any) => state.stepsNumber.numberOfSteps
  );
  const QuantityOfSteps = useSelector(
    (state: any) => state.stepsNumber.targetQuantitySteps
  );
  const dispatch = useDispatch();

  //   const [NumberOfSteps, setNumberOfSteps] = useState(0);
  const animationWidth = `${Math.min(
    (NumberOfSteps / QuantityOfSteps) * 100,
    100
  ).toFixed(0)}%`;

  return (
    <>
      <div className="">
        <div className=" pt-8 ">
          <div className="bg-black  rounded-[0.4rem]  relative w-full border-solid border-2 border-white h-8 ">
            <motion.div
              initial={{ width: 0 }} // Ustaw początkową szerokość na 0 i left na 0
              animate={{
                left: animationWidth, // Przesuń element w prawo do 100%
              }}
              transition={{ duration: 1.5, type: "tween" }}
              style={{
                position: "absolute",

                bottom: "100%",
                color: "white",
              }}
            >
              <p className="flex w-22">{animationWidth} </p>
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(
                  (NumberOfSteps / QuantityOfSteps) * 100,
                  100
                )}%`,
              }}
              transition={{ duration: 1.5, type: "tween" }}
              style={{
                background: " #edb90c",
              }}
              className="h-[1.8rem] rounded-[0.3rem]"
            ></motion.div>{" "}
          </div>
        </div>
        <div className="flex h-full space-x-2 p-5">
          <TextField
            type="number"
            value={NumberOfSteps}
            onChange={(e) =>
              dispatch(updateNumberOfSteps(parseInt(e.target.value)))
            }
            className="w-24  my-auto"
            inputProps={{
              style: {
                height: "0.5rem",
                fontSize: "1rem",
              },
            }}
          />
          <p className="text-base text-gray my-auto  space-x-2">
            /{QuantityOfSteps} Kroki
          </p>
        </div>
      </div>
    </>
  );
};

export default NumberOfSteps;
