import { SupabaseClient } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { useQuery } from "@tanstack/react-query";
import { Database } from "@/lib/database.types";

export const getCampaignLead = async (
  supabaseClient: SupabaseClient,
  campaignId: string
) => {
  const { error, data } = await supabaseClient
    .from("campaign__lead")
    .select(
      "lead_id, first_name, last_name, email, enquiry_date, enquiry_source"
    )
    .eq("campaign_id", campaignId)
    .order("enquiry_date", { ascending: false });

  if (error) {
    const msg = {
      status: 500,
      message: "Error fetching campaign leads",
      err: error,
    };
    throw msg;
  }

  return data;
};

export const useGetCampaignLead = (campaignId: string) => {
  const supabaseClient = useSupabaseClient<Database>();
  return useQuery(
    ["campaign"],
    () => getCampaignLead(supabaseClient, campaignId),
    {
      initialData: [],
    }
  );
};
