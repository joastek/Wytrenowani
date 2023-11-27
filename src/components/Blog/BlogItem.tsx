import React from "react";
import { Blog } from "@/types/type";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/hooks/useUser";
import DeleteIcon from "@mui/icons-material/Delete";
import { Varela_Round } from "next/font/google";
interface BlogItemProps {
  data: Blog;
  key: string; // dltWeight jako funkcja przyjmująca wagę jako argument
}

const BlogItem: React.FC<BlogItemProps> = ({ data, key }) => {
  const { supabaseClient } = useSessionContext();
  const router = useRouter();

  return (
    <>
      {" "}
      <tbody className="m-6">
        <tr key={data.id}>
          <th>{data.name} kg</th>
          <th>{data.description}</th>
        </tr>
      </tbody>
    </>
  );
};

export default BlogItem;
