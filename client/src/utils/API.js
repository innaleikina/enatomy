import axios from "axios";

export default {
  createUser: function(userData) {
    return axios.post("/user/api/", userData);
  },

  getUser: function(userLogin) {
    return axios.post("/user/login", userLogin);
  },

  fetchUser: function() {
    return axios.get("/user/fetch");
  },

  logout: function() {
    return axios.get("/user/logout/");
  },

  // s3Route: function() {
  //   return axios.get("/s3/signedlink/");
  // }

};
