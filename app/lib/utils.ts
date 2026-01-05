import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api",
  // headers: {
  //   Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
  // },
});
