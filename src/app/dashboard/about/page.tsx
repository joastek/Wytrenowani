"use client";
import { useState } from "react";
const dashboard = () => {
  const [mass, setMass] = useState<number>();
  const [height, setHeight] = useState<number>();

  const calculateBMI = () => {
    if (mass && height) {
      const bmi = mass / (height * height);
      return bmi.toFixed(2); // Zaokrąglamy do dwóch miejsc po przecinku
    }
    return "";
  };
  return (
    <>
      <div className=" h-screen bg-slate-400 flex justify-center items-center max-w-screen-2xl m-auto">
        <label htmlFor="mass">Masa ciała</label>

        <input
          type="number"
          id="mass"
          name="number"
          className="h-24 w-24 text-5xl"
          value={mass}
          onChange={(e) => setMass(parseFloat(e.target.value))}
        />
        <label htmlFor="height">Wzrost</label>
        <input
          type="number"
          id="height"
          name="number"
          className="h-24 w-24 text-5xl"
          value={height}
          onChange={(e) => setHeight(parseFloat(e.target.value))}
        />
        <label htmlFor="number">wiek</label>
        <input
          type="number"
          id="number"
          name="number"
          className="h-24 w-24 text-5xl"
        />
        <label htmlFor="gender">Płeć</label>
        <select id="gender">
          <option>Mężczyzna</option>
          <option>Kobieta</option>
        </select>
        <label htmlFor="PAL">Aktywność</label>
        <select id="PAL">
          <option>Siedzący tryb życia</option>
          <option>Mała aktywnośc</option>
          <option>Umiarkowana aktywność</option>
          <option>Wysoka aktywność</option>
          <option>Bardzo wysoka aktywność</option>
        </select>
        <div className="text-3xl block"> Wynik BMR:{calculateBMI()}</div>
      </div>
    </>
  );
};

export default dashboard;
