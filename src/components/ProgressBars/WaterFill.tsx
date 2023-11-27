"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateFillLevels,
  updateAnimationLevels,
  updateTargetFillLevel,
} from "@/slice/Dashboard/numberOfGlasses";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
const WaterFill = () => {
  const [newMaxFillLevel, setNewMaxFillLevel] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const maxFillLevel = useSelector(
    (state: any) => state.glassOfWater.targetFillLevel
  );
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

  // };

  return (
    <>
      <div className="flex">
        <div className="water   ">
          <div
            className="wave "
            style={{ bottom: `${fillLevel - fillLevels}%` }}
          />
        </div>
        <div className="flex  text-base space-x-2">
          <div> {fillLevels}</div>

          <div className="text-base text-gray">
            {isEditing ? (
              `/${maxFillLevel}`
            ) : (
              <TextField
                type="number"
                value={newMaxFillLevel}
                onChange={(e) => setNewMaxFillLevel(e.target.value)}
                className="w-24 h-4"
              />
            )}{" "}
            szklanek
          </div>
          <div className="h-full flex  justify-center items-end p-2 ">
            {" "}
            <Button
              onClick={handleAddClick}
              className="rounded-[5rem] w-6 h-6 mr-6 items-center flex"
              disableRipple
            >
              {" "}
              +250ml
            </Button>
            {/* <Button
            onClick={() => {
              handleEditClick(), handleUpdateClick();
            }}
            className="rounded-[5rem] w-6 h-6"
            disableRipple
          >
            {isEditing ? (
              <>
                <EditIcon />
              </>
            ) : (
              <CheckIcon />
            )}
          </Button> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default WaterFill;
