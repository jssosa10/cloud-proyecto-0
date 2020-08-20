import axios from "axios";

export default axios.create({
  baseURL: "http://172.24.98.179:8080/api",
  headers: {
    "Authorization": "Token "+localStorage.getItem("token")
  }
});