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
  const handleAddSet = () => {
    const lastSetId =
      trainingSet.length > 0 ? trainingSet[trainingSet.length - 1].id : 0;
    dispatch(
      addSet({
        id: lastSetId + 1, // Assign a new id when adding a user
        seriesName: seriesName,
        series: series,
        reps: reps,
      })
    );
    handleAddTypeOfTrening();
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
            return (
              <div
                key={training.id}
                className=" w-[65rem] h-[4rem] m-auto bg-white mb-[1rem] relative"
              >
                <div className="flex ">
                  {" "}
                  <h1>{training.name}</h1>
                  <h1>{training.selectedOption}</h1>
                  <div className="right-0 absolute">
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
                  <Button variant="contained" onClick={handleAddSet}>
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
                  {training.sets.map((set: any) => {
                    return (
                      <div key={set.id}>
                        {" "}
                        <h1>{set.seriesName}</h1>
                      </div>
                    );
                  })}
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
