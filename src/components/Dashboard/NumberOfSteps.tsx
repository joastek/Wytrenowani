import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateNumberOfSteps } from "@/slice/Dashboard/numberOfSteps";
import TextField from "@mui/material/TextField";
const NumberOfSteps = () => {
  const NumberOfSteps = useSelector(
    (state: any) => state.stepsNumber.numberOfSteps
  );
  const dispatch = useDispatch();
  const [maxNumberOfSteps, setMaxNumberOfSteps] = useState(10000);
  //   const [NumberOfSteps, setNumberOfSteps] = useState(0);
  const animationWidth = `${Math.min(
    (NumberOfSteps / maxNumberOfSteps) * 100,
    100
  ).toFixed(0)}%`;

  return (
    <>
      <div className="bg-black h-6 rounded-lg  relative w-full">
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
          <p className="flex w-24">{animationWidth} </p>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${Math.min(
              (NumberOfSteps / maxNumberOfSteps) * 100,
              100
            )}%`,
          }}
          transition={{ duration: 1.5, type: "tween" }}
          style={{
            background: "red",
          }}
          className="h-6 rounded-lg"
        ></motion.div>
      </div>
      <div>
        <TextField
          type="number"
          value={NumberOfSteps}
          onChange={(e) =>
            dispatch(updateNumberOfSteps(parseInt(e.target.value)))
          }
          className="w-24 h-4"
        />
        /{maxNumberOfSteps}
      </div>
    </>
  );
};

export default NumberOfSteps;
