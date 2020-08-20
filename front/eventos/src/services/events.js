import http from "../http_common";

const getAll = () => {
  return http.get("/events/");
};

const get = id => {
  return http.get(`/events/${id}/`);
};

const create = data => {
  return http.post("/events/", data);
};

const update = (id, data) => {
  return http.put(`/events/${id}/`, data);
};

const remove = id => {
  return http.delete(`/events/${id}/`);
};


export default {
  getAll,
  get,
  create,
  update,
  remove
};