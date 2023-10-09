import React from "react";
import { useState } from "react";
import { deleteTraining } from "@/slice/Training/trainingList";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import SeriesController from "@/components/TrainingPlan/seriesControl";
import { addSet, deleteSet } from "@/slice/Training/trainingSet";
import { MenuItem } from "@mui/material";

const CardioActivity = ({ training, trainingSet }: any) => {
  const dispatch = useDispatch();
  const [seriesName, setSeriesName] = useState("");
  const [series, setSeries] = useState("");
  const [reps, setReps] = useState("");

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
        trainingId, // Dodajemy identyfikator treningu, do którego przypisujemy zestaw
      })
    );
  };
  return (
    <div
      key={training.id}
      className=" w-[65rem]  m-auto bg-white  mb-[1rem] relative rounded-lg"
    >
      <div className="flex w-full  bg-green-500 rounded-t-lg">
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

      <div className="block">
        {trainingSet.map((set: any) => {
          if (set.trainingId === training.id) {
            return (
              <div key={set.id} className="flex">
                <h1>{set.seriesName}</h1>
                <h1>{set.series}</h1>
                <div className="block"> {set.repMenuItems}</div>

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
          label="cardio"
          variant="outlined"
          onChange={(event) => {
            setSeriesName(event.target.value);
          }}
        />
        {/* <SeriesController setSeries={setSeries} setReps={setReps} /> */}
      </div>
    </div>
  );
};

export default CardioActivity;
