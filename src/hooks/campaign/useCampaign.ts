import { SupabaseClient } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { useQuery } from "@tanstack/react-query";
import { Database } from "@/lib/database.types";

const getCampaign = async (supabaseClient: SupabaseClient) => {
  const { data, error } = await supabaseClient
    .from("campaign")
    .select(
      "campaign_id, name, description, tags, created_at, campaign__team(account_user(first_name, last_name, profile_image))"
    )
    .eq("is_archived", false);

  if (error) {
    const msg = {
      status: 500,
      message: "Error fetching test",
      err: error,
    };
    return [];
  }

  return data;
};

export const useGetCampaign = () => {
  const supabaseClient = useSupabaseClient<Database>();
  return useQuery(["campaign"], () => getCampaign(supabaseClient), {
    initialData: [],
  });
};
