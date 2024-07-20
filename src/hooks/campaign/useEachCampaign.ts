import { SupabaseClient } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { useQuery } from "@tanstack/react-query";
import { Database } from "@/lib/database.types";

const getEachCampaign = async (
  supabaseClient: SupabaseClient,
  campaignId: string
) => {
  const { data, error } = await supabaseClient
    .from("campaign")
    .select(
      "campaign_id, name, description, tags, created_at, campaign__team(account_user(first_name, last_name, profile_image))"
    )
    .eq("is_archived", false)
    .eq("campaign_id", campaignId)
    .single();

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

export const useGetEachCampaign = (campaignId: string) => {
  const supabaseClient = useSupabaseClient<Database>();
  return useQuery(
    ["campaign"],
    () => getEachCampaign(supabaseClient, campaignId),
    {
      initialData: [],
    }
  );
};
