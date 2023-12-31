import React from "react";
import { Weight } from "@/types/type";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import DeleteIcon from "@mui/icons-material/Delete";

interface WeightItemProps {
  data: Weight;
  key: string; // dltWeight jako funkcja przyjmująca wagę jako argument
}

const WeightItem: React.FC<WeightItemProps> = ({ data, key }) => {
  const { supabaseClient } = useSessionContext();
  const router = useRouter();

  const delteFunction = async (e: string) => {
    const { data, error } = await supabaseClient
      .from("weight")
      .delete()
      .eq("id", e);

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }

    router.refresh();
  };

  return (
    <>
      {" "}
      <tbody className="m-6  sm:m-2">
        <tr key={data.user_id}>
          <td className=" text-xl">{data.weight} kg</td>
          <td className=" text-xl">{data.date}</td>
          <td onClick={() => delteFunction(data.id)}>
            <DeleteIcon className=" cursor-pointer" />
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default WeightItem;
