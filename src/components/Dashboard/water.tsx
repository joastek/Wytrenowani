import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
const WaterFill = () => {
  const [fillLevel, setFillLevel] = useState(-50);
  const [maxFillLevel, setMaxFillLevel] = useState(9);
  const [fillLevels, setFillLevels] = useState(
    Math.ceil((fillLevel + 50) / 10)
  );
  const [newMaxFillLevel, setNewMaxFillLevel] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  /////////////////////
  ////////////////
  // Funkcja do napełniania szklanki
  const handleFillClick = () => {
    if (fillLevel < 100) {
      // Max poziom napełnienia szklanki
      setFillLevel((prevFillLevel) => prevFillLevel + 10); // Możesz dostosować tempo napełniania
    }
  };
  const handleAddClick = () => {
    // Oblicz procent, o ile ma zostać zwiększone fillLevel
    const incrementPercentage = 100 / maxFillLevel;

    if (fillLevels < maxFillLevel) {
      setFillLevel((prevFillLevel) => prevFillLevel + incrementPercentage);
      setFillLevels((prevFillLevels) => prevFillLevels + 1); // Dodaj 1 do fillLevels
    }
  };

  const handleRemoveClick = () => {
    const incrementPercentage = 100 / maxFillLevel;

    if (fillLevels > 0) {
      setFillLevel((prevFillLevel) => prevFillLevel - incrementPercentage);
      setFillLevels((prevFillLevels) => prevFillLevels - 1); // Dodaj 1 do fillLevels
    }
  };
  const handleUpdateClick = () => {
    const newMaxFillLevelValue = parseInt(newMaxFillLevel, 10);

    if (!isNaN(newMaxFillLevelValue) && newMaxFillLevelValue > 0) {
      setMaxFillLevel(newMaxFillLevelValue);
      setFillLevel(-50); // Resetuj fillLevel do stanu początkowego (-50)
      setFillLevels(0);
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
            <input
              type="text"
              value={newMaxFillLevel}
              onChange={(e) => setNewMaxFillLevel(e.target.value)}
              className="w-6"
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
          {/* {isEditing ? (
      
        ) : (
          <Button
            onClick={handleUpdateClick}
            className="rounded-[5rem] w-6 h-6"
          >
            Zatwierdź
          </Button>
        )} */}
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
