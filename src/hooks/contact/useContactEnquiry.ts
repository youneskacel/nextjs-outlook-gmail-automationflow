import { SupabaseClient } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { useQuery } from "@tanstack/react-query";
import { Database } from "@/lib/database.types";

const getContactEnquiry = async (
  email: string,
  supabaseClient: SupabaseClient
) => {
  const { data, error } = await supabaseClient
    .from("property_enquiry")
    .select()
    .eq("email", email)
    .limit(2);

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

export const useGetContactEnquiry = (email: string) => {
  const supabaseClient = useSupabaseClient<Database>();
  return useQuery(
    ["contact", email],
    () => getContactEnquiry(email, supabaseClient),
    {
      initialData: [],
    }
  );
};
