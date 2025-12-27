import { api } from "@/lib/api";

export const getProfileApi = async () => {
  const res = await api.get("/api/user/user-information");
  return res.data?.user;
};

export const updateProfileApi = async (data:{
  first_name?: string;
  surname?: string;
}) => {
  const res = await api.put("/api/user/update-information", data);
  return res.data;
}
