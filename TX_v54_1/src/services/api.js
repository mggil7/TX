import axios from "axios";

const api = axios.create({
  baseURL: "https://fs7my0tyu6.execute-api.sa-east-1.amazonaws.com/prod",
});

export default api;
