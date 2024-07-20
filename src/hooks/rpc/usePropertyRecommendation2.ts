import { SupabaseClient } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { useQuery } from "@tanstack/react-query";
import { Database } from "@/lib/database.types";

const getPropertyRecommendation = async (
  supabaseClient: SupabaseClient,
  pid: number,
  prop_type: string,
  lat: number,
  long: number,
  from_area: number,
  to_area: number,
  is_ext: number,
  within_km: number,
  top_n: number
) => {
  const { data, error } = await supabaseClient.rpc(
    "nearby_recommended_property",
    {
      pid: pid,
      prop_type: prop_type,
      lat: lat,
      long: long,
      from_area: from_area,
      to_area: to_area,
      is_ext: is_ext,
      within_km: within_km,
      top_n: top_n,
    }
  );

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

export const useGetPropertyRecommendation = (
  pid: number,
  prop_type: string,
  lat: number,
  long: number,
  from_area: number,
  to_area: number,
  is_ext: number,
  within_km: number,
  top_n: number
) => {
  const supabaseClient = useSupabaseClient<Database>();
  return useQuery(
    ["product", lat, long, is_ext],
    () =>
      getPropertyRecommendation(
        supabaseClient,
        pid,
        prop_type,
        lat,
        long,
        from_area,
        to_area,
        is_ext,
        within_km,
        top_n
      ),
    {
      initialData: [],
    }
  );
};
