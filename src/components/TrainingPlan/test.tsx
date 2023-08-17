import React, { useState, ChangeEvent } from "react";

interface CustomComponentProps {
  number: number;
}

const CustomComponent: React.FC<CustomComponentProps> = ({ number }) => {
  return <div>This is component {number}</div>;
};

const App: React.FC = (setMenuItem) => {
  const [numberOfComponents, setNumberOfComponents] = useState<number>(0);
  const [componentArray, setComponentArray] = useState<number[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newNumberOfComponents = parseInt(event.target.value);
    const newComponentArray = Array.from(
      { length: newNumberOfComponents },
      (_, index) => index + 1
    );

    setNumberOfComponents(newNumberOfComponents);
    setComponentArray(newComponentArray);
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Enter a number"
        onChange={handleInputChange}
      />
      <div>
        {componentArray.map((componentNumber) => (
          <CustomComponent key={componentNumber} number={componentNumber} />
        ))}
      </div>
    </div>
  );
};

export default App;
