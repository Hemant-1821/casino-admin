import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    process.env.REACT_APP_ENV === "LOCAL"
      ? process.env.REACT_APP_BACKEND_LOCAL
      : process.env.REACT_APP_BACKEND_PROD,
});
