import React from "react";
import { Weight } from "@/types/type";

interface WeightItemProps {
  data: Weight;
  dltWeight: any; // dltWeight jako funkcja przyjmująca wagę jako argument
}

const WeightItem: React.FC<WeightItemProps> = ({ data, dltWeight }) => {
  //   const handleDeleteWeight = dltWeight();

  return <></>;
};

export default WeightItem;
