import axios from "axios";

const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
});

export default ApiClient;
