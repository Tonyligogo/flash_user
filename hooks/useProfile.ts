import { getProfileApi } from "@/api/user.api";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfileApi,
  });
};
