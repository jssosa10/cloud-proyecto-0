import axios from "axios";


const API_URL = "http://172.24.98.179:8080/api/";



const register = (username, email, first_name, last_name ,password) => {
  return axios.post(API_URL + "create-user/", {
    username,
    email,
    first_name,
    last_name,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "api-auth/", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        //setAuthToken(response.data.token);
      }

      return response.data;
    });
};



export default {
  register,
  login,
};