import axios from "axios";
import ip from "../ip";


const API_URL = `${ip}/api/`;



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