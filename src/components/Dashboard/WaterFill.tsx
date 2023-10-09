import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateFillLevels,
  updateAnimationLevels,
} from "@/slice/Dashboard/numberOfGlasses";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
const WaterFill = () => {
  const [maxFillLevel, setMaxFillLevel] = useState(9);

  const [newMaxFillLevel, setNewMaxFillLevel] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const fillLevels = useSelector((state: any) => state.glassOfWater.fillLevels);
  const fillLevel = useSelector(
    (state: any) => state.glassOfWater.animationLevel
  );

  const dispatch = useDispatch();
  /////////////////////

  const handleAddClick = () => {
    // Oblicz procent, o ile ma zostać zwiększone fillLevel
    const incrementPercentage = 100 / maxFillLevel;

    if (fillLevels < maxFillLevel) {
      const newFillLevels = fillLevels + 1;
      dispatch(updateFillLevels(newFillLevels));
      dispatch(updateAnimationLevels(fillLevel + incrementPercentage));
    }
  };

  // const handleRemoveClick = () => {
  //   const incrementPercentage = 100 / maxFillLevel;

  //   if (fillLevels > 0) {
  //     setFillLevel((prevFillLevel) => prevFillLevel - incrementPercentage);
  //     setFillLevels((prevFillLevels) => prevFillLevels - 1); // Dodaj 1 do fillLevels
  //   }
  // };
  const handleUpdateClick = () => {
    const newMaxFillLevelValue = parseInt(newMaxFillLevel, 10);

    if (!isNaN(newMaxFillLevelValue) && newMaxFillLevelValue > 0) {
      setMaxFillLevel(newMaxFillLevelValue);
      dispatch(updateAnimationLevels(-50));
      dispatch(updateFillLevels(0));
    }
  };
  const handleEditClick = () => {
    setIsEditing((prev) => !prev); // Po kliknięciu "Edytuj" przestaw isEditing na true
  };
  return (
    <>
      {" "}
      <div className="water w-1/4">
        <div
          className="wave "
          style={{ bottom: `${fillLevel - fillLevels}%` }}
        />
      </div>
      <div className="w-3/4 ml-4 ">
        <p className="text-base">
          {fillLevels}/
          {isEditing ? (
            `${maxFillLevel}`
          ) : (
            <TextField
              type="number"
              value={newMaxFillLevel}
              onChange={(e) => setNewMaxFillLevel(e.target.value)}
              className="w-24 h-4"
            />
          )}{" "}
          szklanek
        </p>
        <div className="h-full flex  justify-center items-end p-6">
          {" "}
          <Button
            onClick={handleAddClick}
            className="rounded-[5rem] w-6 h-6 mr-6 items-center flex"
          >
            {" "}
            +250ml
          </Button>
          <Button
            onClick={() => {
              handleEditClick(), handleUpdateClick();
            }}
            className="rounded-[5rem] w-6 h-6"
          >
            {isEditing ? (
              <>
                <EditIcon />
              </>
            ) : (
              <CheckIcon />
            )}
          </Button>
        </div>
      </div>
    </>
  );
};
export default WaterFill;