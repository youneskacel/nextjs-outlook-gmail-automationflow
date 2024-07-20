import { SupabaseClient } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { useQuery } from "@tanstack/react-query";
import { Database } from "@/lib/database.types";

const getContact = async (supabaseClient: SupabaseClient) => {
  const { data, error } = await supabaseClient
    .from("contact")
    .select(
      "contact_id, first_name, last_name, email, phone, image, address, suburb, postcode, state, created_at, company(name)"
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

export const useGetContact = () => {
  const supabaseClient = useSupabaseClient<Database>();
  return useQuery(["contact"], () => getContact(supabaseClient), {
    initialData: [],
  });
};

const getEachContact = async (
  supabaseClient: SupabaseClient,
  contactId: string
) => {
  const { data, error } = await supabaseClient
    .from("contact")
    .select(
      "contact_id, first_name, last_name, email, phone, image, address, suburb, postcode, state, created_at, company(name)"
    )
    .eq("contact_id", contactId)
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

export const useGetEachContact = (contactId: string) => {
  const supabaseClient = useSupabaseClient<Database>();
  return useQuery(
    ["EachContact", contactId],
    () => getEachContact(supabaseClient, contactId),
    {
      initialData: [],
    }
  );
};
