"use client";
import { trainingState } from "@/types/type";
import { addTraining } from "@/slice/trainingList";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
const TrainingPlan = () => {
  const dispatch = useDispatch();
  const userList = useSelector(
    (state: trainingState) => state.trainingList.value
  );
  return (
    <>
      <div className="w-screen justify-center text-center">
        <div className="addUser">
          <input type="text" placeholder="Name..." />
          <input type="text" placeholder="UserName..." />
          <button
            onClick={() => {
              dispatch(addTraining({ id: 0, name: "", username: "" }));
            }}
          >
            Add User
          </button>
        </div>
        <div>
          {userList.map((user: any) => {
            return (
              <div>
                <h1>{user.name}</h1>
                <h1>{user.username}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TrainingPlan;
