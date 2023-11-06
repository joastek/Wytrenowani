import { Weight } from "@/types/type";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getWeight = async (): Promise<Weight[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }
  const { data, error } = await supabase
    .from("weight")
    .select("*")
    .eq("user_id", sessionData.session?.user.id)
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error);
  }
  return (data as any) || [];
};
export default getWeight;
