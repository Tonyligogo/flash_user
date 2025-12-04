import { api } from "@/lib/api";

export const getProfileApi = async () => {
  const res = await api.get("/api/user/user-information");
  return res.data;
};
