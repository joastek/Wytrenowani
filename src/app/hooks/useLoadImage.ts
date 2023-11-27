import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Blog } from "@/types/type";

const useLoadImage = (blog: Blog) => {
  const supabaseClient = useSupabaseClient();

  if (!blog) {
    return null;
  }

  const { data: imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(blog.link);

  return imageData.publicUrl;
};

export default useLoadImage;
