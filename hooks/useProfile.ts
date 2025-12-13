import { getProfileApi, updateProfileApi } from "@/api/user.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfileApi,
  });
};

export const useUpdateProfile=()=>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:updateProfileApi,
    onSuccess: (updatedData) => {
      // 1. Invalidate the old query cache
      // This forces the useUserInfo hook to refetch the latest data
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      
      // I am directly setting the new data in the cache (Optimistic Update)
      queryClient.setQueryData(["profile"], updatedData);

      console.log('updated data',updatedData)
  },
  })
}
