import http from "../http_common";

const getAll = (token) => {
  return http(token).get("/events/");
};

const get = (token,id) => {
  return http(token).get(`/events/${id}/`);
};

const create = (token,data) => {
  return http(token).post("/events/", data);
};

const update = (token,id, data) => {
  return http(token).put(`/events/${id}/`, data);
};

const remove = (token,id) => {
  return http(token).delete(`/events/${id}/`);
};


export default {
  getAll,
  get,
  create,
  update,
  remove
};