"use client";
import { trainingState } from "@/types/type";
import { addTraining } from "@/slice/trainingList";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormController from "@/components/TrainingPlan/FormControl";
import TrainingItem from "@/components/TrainingPlan/strenghtActivity";
import CardioActivity from "@/components/TrainingPlan/cardioActivity";
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
  const StrengthTraining = ({ training, trainingSet }: any) => (
    <TrainingItem training={training} trainingSet={trainingSet} />
  );
  const CardioTraining = ({ training, trainingSet }: any) => (
    <CardioActivity training={training} trainingSet={trainingSet} />
  );
  const handleAddNewTraining = () => {
    setAddNewTraining((prev) => !prev);
  };
  const handleAddTypeOfTrening = () => {
    setAddNewTraining(false);
    setSelectedOption("");
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
                className="fixed top-0 left-0 right-0 bottom-0 bg-black  backdrop-filter backdrop-blur-[2px] bg-opacity-30 z-50"
                onClick={handleAddNewTraining}
              />
              <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[10rem] bg-white z-50 p-8 rounded-t-lg">
                {" "}
                <TextField
                  id="outlined-basic"
                  label="Nazwa"
                  variant="outlined"
                  onChange={(event: any) => {
                    setName(event.target.value);
                  }}
                  sx={{ m: 2, width: "35ch" }}
                />
                <FormController onSelectOption={setSelectedOption} />
                <Button
                  variant="contained"
                  onClick={() => {
                    handleAddTraining();
                    handleAddTypeOfTrening();
                  }}
                  sx={{ m: 3, width: "5ch" }}
                >
                  <AddIcon />
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

            return (
              <>
                {" "}
                <div key={training.id}>
                  <StrengthTraining
                    training={training}
                    trainingSet={setsForTraining}
                  />
                </div>
                {/* <div key={training.id}>
                  {selectedOption === "Cardio" && (
                    <CardioTraining
                      training={training}
                      trainingSet={setsForTraining}
                    />
                  )}
                </div> */}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TrainingPlan;
