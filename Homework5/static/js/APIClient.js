import HTTPClient from "./HTTPClient.js";

const API_BASE = "/api";

export default {
  getCurrentUser: () => {
    return HTTPClient.get(API_BASE + "/users/current");
  },

  logIn: (username, password) => {
    let data = {
      username: username,
      password: password,
    };
    return HTTPClient.post(API_BASE + "/login", data);
  },

  logOut: () => {
    return HTTPClient.post(API_BASE + "/logout", {});
  },
};
