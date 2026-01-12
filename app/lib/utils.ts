import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://quiz-app-one-flax-73.vercel.app/api",
  // headers: {
  //   Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
  // },
});
