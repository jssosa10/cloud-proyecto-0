import axios from "axios";

const http = (token) => axios.create({
  baseURL: "http://172.24.98.179:8081/api",
  headers: {
    "Authorization": "Token "+token
  }
});

export default http;