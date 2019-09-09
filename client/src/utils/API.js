import axios from "axios";

export default {
  createUser: function(userData) {
    return axios.post("/user/api/", userData);
  },

  confirm: function(id){
    return axios.post("/user/nodemailer/confirm/" +  id)
  },

   checkUser: function(userData){
     return axios.post("/user/api/validation", userData)
   },

  getUser: function(userLogin) {
    return axios.post("/user/login", userLogin);
  },

  findUserByEmail: function(userEmail){
    return axios.get("/user/email/" + userEmail)
  },

  fetchUser: function() {
    return axios.get("/user/fetch");
  },

  getUserCart:function(userId){
    return axios.get("/user/" + userId)
  }, 

  logout: function() {
    return axios.get("/user/logout/");
  },

  getFiles: function() {
    return axios.get("/s3/getfiles/");
  },

  addToCart: function(id,setName) {
    return axios.put("/cart/addtocart/" + id + "/" + setName)
  },

  addToPurchased: function(id,setName) {
    return axios.put("/cart/addtopurchased/" + id + "/" + setName)
  },
  emptyPurchases:function(id){
    return axios.put("cart/emptypurchased/" + id)
 },

  removeOneFromCart:function(id,setName){
    return axios.put("/cart/remove/" + id + "/" + setName)
  },

  emptyCart:function(id){
     return axios.put("/cart/emptycart/" + id)
  },

  downloadSet:function(setName){
    return axios.get("/s3/download/"+ setName)
  },

  sendWelcomeEmail:function(name, email, id){
    return axios.post("/nodemailer/sendwelcomeemail/" + name + "/" + email + "/" + id)
  },

  // emailConfirmURL:function(id){
  //   return axios.get("sendgrid/confirm/" + id )
  // }
};