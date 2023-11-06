import React from "react";
import { PageContent } from "./components/PageFileComponent";
import deleteWeight from "@/actions/deleteWeight";
import getWeight from "@/actions/getWeight";

export const revalidate = 0;
const History = async () => {
  const dltWeight = await deleteWeight();
  const weight = await getWeight();

  return (
    <div className="flex justify-center items-center  flex-col ">
      <PageContent weight={weight} dltWeight={dltWeight} />
    </div>
  );
};
export default History;
