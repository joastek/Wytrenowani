import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
export default function SeriesController({
  setSeries,
  setReps,
}: {
  setSeries: (option: string) => void;
  setReps: (option: string) => void;
}) {
  const [series, setSerie] = React.useState("");
  const [rep, setRep] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setSerie(event.target.value as string);
    setSeries(event.target.value as string);
  };
  const handleChangeRep = (event: SelectChangeEvent) => {
    setRep(event.target.value as string);
    setReps(event.target.value as string);
  };

  const renderRepsItems = (maxValue: number) => {
    const items = [];
    for (let i = 1; i <= maxValue; i++) {
      items.push(
        <MenuItem key={i} value={i.toString()}>
          {i}
        </MenuItem>
      );
    }
    return items;
  };
  const renderSeriesItems = (maxValue: number) => {
    const items = [];
    for (let i = 1; i <= maxValue; i++) {
      items.push(
        <MenuItem key={i} value={i.toString()}>
          {i}
        </MenuItem>
      );
    }
    return items;
  };

  return (
    <>
      {" "}
      <FormControl className="w-[12rem]">
        <InputLabel id="demo-simple-select-label">Ilość serii</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChange}
          value={series}
          label="Rodzaj"
        >
          {renderRepsItems(8)}
        </Select>
      </FormControl>
      <FormControl className="w-[12rem]">
        <InputLabel id="demo-simple-select-label">Ilość powtórzeń</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChangeRep}
          value={rep}
          label="Rodzaj"
        >
          {renderSeriesItems(12)}
        </Select>
      </FormControl>
    </>
  );
}
