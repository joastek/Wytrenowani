import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
export default function FormController({
  onSelectOption,
}: {
  onSelectOption: (option: string) => void;
}) {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
    onSelectOption(event.target.value as string);
  };
  return (
    <>
      {" "}
      <FormControl className="w-[12rem]">
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
