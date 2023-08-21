import React, { useState } from "react";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
} from "@mui/material";
import { addSet, deleteSet } from "@/slice/trainingSet";
import { deleteTraining } from "@/slice/trainingList";

const StrengthActivity = ({ training, trainingSet }: any) => {
  const dispatch = useDispatch();
  const [seriesName, setSeriesName] = useState("");
  const [selectedSeriesCount, setSelectedSeriesCount] = useState(0);
  const [series, setSeries] = useState("");
  const [reps, setReps] = useState("");
  const [serie, setSerie] = React.useState("");
  const [rep, setRep] = React.useState("");

  const handleAddSet = (trainingId: any) => {
    const lastSetId =
      trainingSet.length > 0 ? trainingSet[trainingSet.length - 1].id : 0;
    dispatch(
      addSet({
        id: lastSetId + 1,
        seriesName: seriesName,
        series: series,
        reps: reps,
        repMenuItems: Array.from({ length: Number(reps) }, (_, index) => (
          <MenuItem key={index + 1} value={(index + 1).toString()}>
            {index + 1}
          </MenuItem>
        )),
        trainingId,
      })
    );
    setSelectedSeriesCount(parseInt(series));
  };

  const handleChange = (event: any) => {
    const selectedSeries = event.target.value as string;
    setSerie(selectedSeries);
    setSeries(selectedSeries);
    setRep(""); // Clear the rep value when series changes
  };

  const handleChangeRep = (event: any) => {
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
    <div
      key={training.id}
      className="w-[65rem] m-auto bg-white mb-[1rem] relative rounded-lg"
    >
      <div className="flex w-full bg-slate-400 rounded-t-lg">
        <div className="block">
          <h1 className="ml-0"> {training.name}</h1>
          <h2>{training.selectedOption}</h2>
        </div>

        <div className="ml-auto">
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              dispatch(deleteTraining({ id: training.id }));
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>

      <div className="block  h-[25rem] overflow-auto">
        {trainingSet.map((set: any) => {
          if (set.trainingId === training.id) {
            // Generuj repMenuItems dla tego zestawu treningowego
            const repsSelects = set.repMenuItems.map(
              (repMenuItem: any, index: number) => (
                <div key={index} className="flex">
                  {repMenuItem}
                </div>
              )
            );

            return (
              <div key={set.id} className="block">
                <h1>{set.seriesName}</h1>

                {Array.from({ length: selectedSeriesCount }).map((_, index) => (
                  <div key={index} className="flex">
                    {repsSelects}
                  </div>
                ))}

                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={() => {
                    dispatch(deleteSet({ id: set.id }));
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            );
          } else {
            return null;
          }
        })}

        <Button variant="contained" onClick={() => handleAddSet(training.id)}>
          <AddIcon />
        </Button>
        <TextField
          id="outlined-basic"
          label="Nazwa serii"
          variant="outlined"
          onChange={(event) => {
            setSeriesName(event.target.value);
          }}
        />
        <FormControl className="w-[12rem]">
          <InputLabel id="series-label">Ilość serii</InputLabel>
          <Select
            labelId="series-label"
            id="demo-simple-select"
            onChange={(event) => {
              handleChange(event);
            }}
            value={serie}
            label="Rodzaj"
          >
            {renderSeriesItems(8)}
          </Select>
        </FormControl>
        <FormControl className="w-[12rem]">
          <InputLabel id="series-label">Ilość powtórzeń</InputLabel>
          <Select
            labelId="series-label"
            id="demo-simple-select"
            onChange={handleChangeRep}
            value={rep}
            label="Rodzaj"
          >
            {renderRepsItems(12)}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default StrengthActivity;
