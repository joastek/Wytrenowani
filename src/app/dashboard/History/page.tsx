import React from "react";

import getWeight from "@/actions/getWeight";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Weight } from "@/types/type";
import { PageContent } from "./components/PageFileComponent";
import Chart from "@/components/Dashboard/Chart";

export const revalidate = 0;

const History = async () => {
  const weight = await getWeight();
  return (
    <div className="flex justify-center items-center  flex-col">
      <PageContent weight={weight} />
    </div>
  );
};

export default History;
