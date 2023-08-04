"use client";
import { trainingState } from "@/types/type";
import {
  addTraining,
  deleteTraining,
  updateTraining,
} from "@/slice/trainingList";
import { addSet, deleteSet, updateSet } from "@/slice/trainingSet";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import FormController from "@/components/TrainingPlan/FormControl";

import SeriesController from "@/components/TrainingPlan/seriesControl";
const TrainingPlan = () => {
  const dispatch = useDispatch();
  const trainingList = useSelector(
    (state: trainingState) => state.trainingList.value
  );
  const trainingSet = useSelector(
    (state: trainingState) => state.trainingSet.value
  );

  const [addNewTraining, setAddNewTraining] = useState(false);
  const [name, setName] = useState("");
  const [username, setuserName] = useState("");

  const [selectedOption, setSelectedOption] = useState("");
  ////
  const [seriesName, setSeriesName] = useState("");
  const [series, setSeries] = useState("");
  const [reps, setReps] = useState("");
  const handleAddNewTraining = () => {
    setAddNewTraining((prev) => !prev);
  };
  const handleAddTypeOfTrening = () => {
    setAddNewTraining(false);
  };
  const handleAddTraining = () => {
    const lastUserId =
      trainingList.length > 0 ? trainingList[trainingList.length - 1].id : 0;
    dispatch(
      addTraining({
        id: lastUserId + 1, // Assign a new id when adding a user
        name: name,
        username: username,
        selectedOption: selectedOption,
        sets: [],
      })
    );
    handleAddTypeOfTrening();
  };
  const handleAddSet = (trainingId: any) => {
    const lastSetId =
      trainingSet.length > 0 ? trainingSet[trainingSet.length - 1].id : 0;
    dispatch(
      addSet({
        id: lastSetId + 1,
        seriesName: seriesName,
        series: series,
        reps: reps,
        trainingId, // Dodajemy identyfikator treningu, do którego przypisujemy zestaw
      })
    );
    // handleAddTypeOfTrening(); // Możesz zakomentować tę linię, aby okno dialogowe nie zamykało się po dodaniu zestawu
  };
  return (
    <>
      <div className="w-screen justify-center text-center">
        <div className=" p-32">
          <div className="w-[56rem] justify-center items-center m-auto h-full z-0">
            <Button
              variant="contained"
              onClick={handleAddNewTraining}
              className="h-12 z-0"
            >
              <AddIcon /> Dodaj trening
            </Button>
          </div>

          {addNewTraining && (
            <>
              <div
                className="fixed top-0 left-0 right-0 bottom-0 bg-black  backdrop-filter backdrop-blur-[2px] bg-opacity-30"
                onClick={handleAddNewTraining}
              />
              <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[10rem] bg-white z-50 p-12">
                {" "}
                <TextField
                  id="outlined-basic"
                  label="Nazwa"
                  variant="outlined"
                  onChange={(event: any) => {
                    setName(event.target.value);
                  }}
                />
                <FormController onSelectOption={setSelectedOption} />
                <Button
                  variant="contained"
                  onClick={() => {
                    handleAddTraining();
                    handleAddTypeOfTrening();
                  }}
                >
                  <AddIcon /> trening
                </Button>
              </div>
            </>
          )}
        </div>
        <div className="p-4">
          {trainingList.map((training: any) => {
            const setsForTraining = trainingSet.filter(
              (set: any) => set.trainingId === training.id
            );
            // Pobieramy zestawy przypisane do tego treningu
            return (
              <div
                key={training.id}
                className=" w-[65rem]  m-auto bg-white mb-[1rem] relative rounded-lg"
              >
                <div className="flex w-full bg-slate-400 rounded-t-lg">
                  {" "}
                  <h1>{training.name}</h1>
                  <h1>{training.selectedOption}</h1>
                  <div className="ml-auto">
                    {" "}
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
                      // Sprawdzamy, czy zestaw należy do tego treningu
                      return (
                        <div key={set.id} className="flex">
                          <h1>{set.seriesName}</h1>
                          <h1>{set.series}</h1>
                          <h1>{set.reps}</h1>
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
                  <Button
                    variant="contained"
                    onClick={() => handleAddSet(training.id)}
                  >
                    <AddIcon />
                  </Button>
                  <TextField
                    id="outlined-basic"
                    label="Nazwa serii"
                    variant="outlined"
                    onChange={(event: any) => {
                      setSeriesName(event.target.value);
                    }}
                  />
                  <SeriesController setSeries={setSeries} setReps={setReps} />
                  {/* <input
                    type="text"
                    placeholder="new UserName..."
                    onChange={(event: any) => {
                      setNewuserName(event.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      dispatch(
                        updateTraining({ id: user.id, username: newusername })
                      );
                    }}
                  >
                    Update Username
                  </button>
                  <button
                    onClick={() => {
                      dispatch(deleteTraining({ id: user.id }));
                    }}
                  >
                    Delete username
                  </button> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TrainingPlan;
