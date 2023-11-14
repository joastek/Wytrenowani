import React from "react";
import { Weight } from "@/types/type";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/hooks/useUser";
import DeleteIcon from "@mui/icons-material/Delete";
import { Varela_Round } from "next/font/google";
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
    console.log("Test");
    router.refresh();
  };

  return (
    <>
      {" "}
      <tbody className="m-6">
        <tr key={data.user_id}>
          <th>{data.weight} kg</th>
          <th>{data.date}</th>
          <th onClick={() => delteFunction(data.id)}>
            <DeleteIcon />
          </th>
        </tr>
      </tbody>
    </>
  );
};

export default WeightItem;
function _createInst() {
  throw new Error("Function not implemented.");
}
