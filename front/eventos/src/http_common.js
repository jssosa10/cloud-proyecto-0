import axios from "axios";
import ip from "./ip";

const http = (token) => axios.create({
  baseURL: `${ip}/api`,
  headers: {
    "Authorization": "Token "+token
  }
});

export default http;