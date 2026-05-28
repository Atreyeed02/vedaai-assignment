import axios from "axios";

export const api = axios.create({
  baseURL: "https://vedaai-assignment-1.onrender.com/api",
});