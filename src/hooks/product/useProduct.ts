import { SupabaseClient } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { useQuery } from "@tanstack/react-query";
import { Database } from "@/lib/database.types";

const getProduct = async (supabaseClient: SupabaseClient, suburb: string) => {
  const { data, error } = await supabaseClient
    .from("product")
    .select(
      "product_id, address, suburb, postcode, latitude, longitude, from_building_area_sqm, to_building_area_sqm, from_land_area_sqm, to_land_area_sqm"
    )
    .eq("suburb", suburb)
    .limit(10);

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

export const useGetProduct = (suburb: string) => {
  const supabaseClient = useSupabaseClient<Database>();
  return useQuery(["product"], () => getProduct(supabaseClient, suburb), {
    initialData: [],
  });
};

const getProductEach = async (
  supabaseClient: SupabaseClient,
  product_id: number
) => {
  const { data, error } = await supabaseClient
    .from("product")
    .select(
      "product_id, type, latitude, longitude, from_building_area_sqm, to_building_area_sqm"
    )
    .eq("product_id", product_id);

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

export const useGetProductEach = (product_id: number) => {
  const supabaseClient = useSupabaseClient<Database>();
  return useQuery(
    ["product", product_id],
    () => getProductEach(supabaseClient, product_id),
    {
      initialData: [],
    }
  );
};
