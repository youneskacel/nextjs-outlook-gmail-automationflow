import { SupabaseClient } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { useQuery } from "@tanstack/react-query";
import { Database } from "@/lib/database.types";

const getProductLead = async (
  supabaseClient: SupabaseClient,
  email: string
) => {
  const { data, error } = await supabaseClient
    .from("product__lead")
    .select(
      "lead_id, first_name, last_name, product_id, enquiry_date, enquiry_source, product(address, suburb, postcode)"
    )
    .eq("email", email);

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

export const useGetProductLead = (email: string) => {
  const supabaseClient = useSupabaseClient<Database>();
  return useQuery(
    ["ProductLead", email],
    () => getProductLead(supabaseClient, email),
    {
      initialData: [],
    }
  );
};
