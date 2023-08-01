"use client";
import { trainingState } from "@/types/type";
import {
  addTraining,
  deleteTraining,
  updateTraining,
} from "@/slice/trainingList";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormController from "@/components/TrainingPlan/FormControl";

const TrainingPlan = () => {
  const dispatch = useDispatch();
  const userList = useSelector(
    (state: trainingState) => state.trainingList.value
  );

  const [addNewTraining, setAddNewTraining] = useState(false);
  const [name, setName] = useState("");
  const [username, setuserName] = useState("");
  const [newusername, setNewuserName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const handleAddNewTraining = () => {
    setAddNewTraining((prev) => !prev);
  };
  const handleAddUser = () => {
    const lastUserId =
      userList.length > 0 ? userList[userList.length - 1].id : 0;
    dispatch(
      addTraining({
        id: lastUserId + 1, // Assign a new id when adding a user
        name: name,
        username: username,
        selectedOption: selectedOption,
      })
    );
  };
  return (
    <>
      <div className="w-screen justify-center text-center">
        <div className=" p-32">
          <div className="w-[56rem] justify-center items-center m-auto h-full">
            {/* {!addNewTraining && ( */}
            <Button
              variant="contained"
              onClick={handleAddNewTraining}
              className="h-12 z-0"
            >
              <AddIcon /> Dodaj trening
            </Button>
          </div>

          {addNewTraining && (
            <div className=" h-[8rem] m-auto ">
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
              <Button variant="contained" onClick={handleAddUser}>
                <AddIcon /> Dodaj trening
              </Button>
            </div>
          )}
        </div>
        <div>
          {userList.map((user: any) => {
            return (
              <div>
                <h1>{user.name}</h1>
                {/* <h1>{user.username}</h1> */}
                <h1>{user.selectedOption}</h1>
                <input
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
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TrainingPlan;
