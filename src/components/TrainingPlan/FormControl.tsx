import * as React from "react";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CardioActivity from "./cardioActivity";
import strenghtActivity from "./strenghtActivity";
export default function FormController({
  onSelectOption,
}: {
  onSelectOption: (option: string, id: any) => void;
}) {
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string;

    setAge(selectedValue);

    if (selectedValue === "Trening siłowy") {
      onSelectOption(selectedValue, strenghtActivity);
    } else if (selectedValue === "Cardio") {
      onSelectOption(selectedValue, CardioActivity);
    } else if (selectedValue === "Stretching") {
      onSelectOption(selectedValue, strenghtActivity);
    }
  };
  return (
    <>
      {" "}
      <FormControl sx={{ m: 2, width: "35ch" }}>
        <InputLabel id="demo-simple-select-label">Rodzaj</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Rodzaj"
          onChange={handleChange}
        >
          <MenuItem value="Trening siłowy">Trening siłowy</MenuItem>
          <MenuItem value="Cardio">Cardio</MenuItem>
          <MenuItem value="Stretching">Stretching</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
