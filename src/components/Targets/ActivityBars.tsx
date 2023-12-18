"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setActivity } from "@/slice/Calculator/bodyFatCalculator";
const ActivityBars = () => {
  const dispatch = useDispatch();
  const [selectedDiv, setSelectedDiv] = useState(null);
  const divs = [
    { text: "Brak aktywności", value: 1.2 },
    { text: "Mała aktywność", value: 1.4 },
    { text: "Średnia aktywność", value: 1.6 },
    { text: "Wysoka aktywność", value: 1.9 },
  ];
  const handleClick = (index: any) => {
    setSelectedDiv(index);
  };
  return (
    <>
      {" "}
      {divs.map((item) => (
        <motion.div
          key={item.value}
          whileHover={{ scale: 1.05 }}
          className={`border  p-1 text-lg m-2 cursor-pointer ${
            selectedDiv === item.value ? "bg-red-500" : ""
          }`}
          onClick={() => {
            handleClick(item.value);
            dispatch(setActivity(item.value)); // Ustaw aktywność przy kliknięciu
          }}
        >
          {item.text}
        </motion.div>
      ))}
    </>
  );
};

export default ActivityBars;
