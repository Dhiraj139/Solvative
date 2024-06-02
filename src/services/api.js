import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "X-RapidAPI-Host": process.env.REACT_APP_RAPIDAPI_HOST,
    "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
  },
});

export const fetchCities = async (params) => {
  try {
    const response = await api.get("", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
