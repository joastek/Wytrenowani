import { Weight } from "@/types/type";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
const deleteWeight = async () => {
  try {
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
      .delete()
      .eq("user_id", sessionData.session?.user.id);

    if (error) {
      console.log(error);
    }

    return (data as any) || [];
  } catch (error) {
    console.log("Błąd podczas wykonywania deleteWeight:", error);
    return [];
  }
};
export default deleteWeight;
