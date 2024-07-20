import { SupabaseClient } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { useQuery } from "@tanstack/react-query";
import { Database } from "@/lib/database.types";

export const getCampaignProduct = async (
  supabaseClient: SupabaseClient,
  campaignId: string
) => {
  const { error, data } = await supabaseClient
    .from("campaign__product")
    .select(
      "product_subtype(product(product_id, address, suburb, postcode, state, type, latitude, longitude, from_building_area_sqm, to_building_area_sqm))"
    )
    .eq("campaign_id", campaignId);

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

export const useGetCampaignProduct = (campaignId: string) => {
  const supabaseClient = useSupabaseClient<Database>();
  return useQuery(
    ["campaign", campaignId],
    () => getCampaignProduct(supabaseClient, campaignId),
    {
      initialData: [],
    }
  );
};

export const getCampaignProductId = async (
  supabaseClient: SupabaseClient,
  campaignId: string
) => {
  const { error, data } = await supabaseClient
    .from("campaign__product")
    .select("product_id")
    .eq("campaign_id", campaignId);

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

export const useGetCampaignProductId = (campaignId: string) => {
  const supabaseClient = useSupabaseClient<Database>();
  return useQuery(
    ["campaign", campaignId, 1],
    () => getCampaignProductId(supabaseClient, campaignId),
    {
      initialData: [],
    }
  );
};
