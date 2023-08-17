import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function SeriesController({
  setSeries,
  setReps,
  repSelects,
}: {
  setSeries: (option: string) => void;
  setReps: (option: string) => void;
  repSelects: JSX.Element[];
}) {
  return <>{repSelects}</>;
}
