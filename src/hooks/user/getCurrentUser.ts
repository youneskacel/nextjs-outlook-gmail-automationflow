import { SupabaseClient } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { useQuery } from "@tanstack/react-query";
import { Database } from "@/lib/database.types";

const getCurrentUser = async (supabaseClient: SupabaseClient) => {
  const currentUserId = (await supabaseClient.auth.getUser()).data.user?.id;

  const { data, error } = await supabaseClient
    .from("account_user")
    .select("account_id, first_name, last_name, role, email, profile_image")
    .eq("user_id", currentUserId)
    .single();

  if (error) {
    const msg = {
      status: 500,
      message: "Error fetching test",
      err: error,
    };
    return null;
  }

  return data;
};

export const GetCurrentUser = () => {
  const supabaseClient = useSupabaseClient<Database>();
  return useQuery(["GetCurrentUser"], () => getCurrentUser(supabaseClient), {
    initialData: null,
  });
};
