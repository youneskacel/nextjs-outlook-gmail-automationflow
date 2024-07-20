import { SupabaseClient } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { useQuery } from "@tanstack/react-query";
import { Database } from "@/lib/database.types";

const getPropertyRecommendation = async (
  supabaseClient: SupabaseClient,
  product_id: number,
  is_ext: number,
  within_km: number,
  top_n: number
) => {
  // Fetch product details first
  const { data: productDetails, error: productError } = await supabaseClient
    .from("product")
    .select("product_id, type, latitude, longitude, building_size, land_size")
    .eq("product_id", product_id)
    .single();

  const propertySize = [
    "Land/Development",
    "Agribusiness",
    "Other",
    "Showroom/bulky goods",
  ].includes(productDetails?.type)
    ? "land_size"
    : "building_size";

  // Use the fetched product details to call the recommendation API
  const { data, error } = await supabaseClient.rpc(
    "nearby_recommended_property",
    {
      pid: product_id,
      prop_type: productDetails?.type,
      lat: productDetails?.latitude,
      long: productDetails?.longitude,
      from_area: Math.ceil(productDetails?.[propertySize]),
      to_area: Math.ceil(productDetails?.[propertySize]),
      is_ext: is_ext,
      within_km: within_km,
      top_n: top_n,
    }
  );

  if (error) {
    const msg = {
      status: 500,
      message: "Error fetching recommendations",
      err: error,
    };

    return [];
  }

  return data;
};

export const useGetPropertyRecommendation = (
  product_id: number,
  is_ext: number,
  within_km: number,
  top_n: number
) => {
  const supabaseClient = useSupabaseClient<Database>();
  return useQuery(
    ["product", product_id, is_ext, within_km, top_n],
    () =>
      getPropertyRecommendation(
        supabaseClient,
        product_id,
        is_ext,
        within_km,
        top_n
      ),
    {
      initialData: [],
    }
  );
};
