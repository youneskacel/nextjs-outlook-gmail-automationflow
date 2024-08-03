import { SupabaseClient } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { useQuery } from "@tanstack/react-query";
import { Database } from "@/lib/database.types";

import {useState,useEffect} from 'react'

const getAppToken = async (
    supabaseClient:SupabaseClient,
    type : string,
) => {
    const {data:{session}} = await supabaseClient.auth.getSession()
    if (!session){
        return null
    }
    const {user : {id}} = session
     const {data,error} = await supabaseClient.from('account_user_token')
                                .select('user_id, type, token, expired_at')
                                .match({'user_id':id,'type':type})
                                .single();
                                 
     if (error) {
        console.error(error)
        const msg = {
            status: 500,
            message: "Error fetching test",
            err: error,
        };
        return null;
    }
    return data.token; 
}

const setAppToken = async (supabaseClient:SupabaseClient,type : string,token : string ) => {
    const {data:{session}} = await supabaseClient.auth.getSession()
    if (!session){
        return null
    }
    const {user : {id}} = session
    const {data : retrieved,error} = await supabaseClient.from('account_user_token')
                                .select('user_id, type, token, expired_at')
                                .match({'user_id':id,'type':type})
                                .single()

    if(retrieved?.token){
        if(retrieved.token === token) return null;
        else{
           const res = await supabaseClient.from('account_user_token')
                                .update({token : token})
                                .match({'user_id':id,'type':type})
                return res.status
            }
        }else{
            const res =  await supabaseClient.from('account_user_token')
                                .insert({'user_id':id,'type':type,'token':token})
            return res.status
        }

}

export const useGetAppToken = ( type:string) => {
    const [appToken,setToken] = useState<string|null|undefined>(null)
    const supabaseClient = useSupabaseClient<Database>();

    useEffect(()=>{
        if(appToken){
            setAppToken(supabaseClient,type,appToken)
        }
        // eslint-disable-next-line
    },[appToken])

    const {data:token,error} = useQuery(
        ["AppToken"],
        ()=> getAppToken(supabaseClient, type),
        {
          initialData: null,
        }
      )
    return [token,setToken]
}