import { useQuery } from "@tanstack/react-query";
import axiosInsrtance from "../lib/axios";
import { getAuthUser } from "../lib/api.js";

export const useAuthUser =() =>{
    const authUser=useQuery({
    queryKey:["authUser"],
    queryFn:getAuthUser,
    retry:false, //auth check only once 
  })
  return {isLoading:authUser?.isLoading,authUser:authUser.data?.user}
    
}