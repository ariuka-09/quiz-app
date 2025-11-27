import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  // headers: {
  //   Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
  // },
});
