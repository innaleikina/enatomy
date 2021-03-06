const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const validateEmail = function(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  passwordHash: {
    type: String,
    required: true
  },
  purchased: [{
    type: String,
  }],
  credits: {
      type:Number
  },
  cart:[{
      type:String,
    }],
    confirmed: {
      type: Boolean,
      default: false
    },
    signUpMessage:{
      type:String,
      default: "Welcome to Enatomy, please check your email to confirm"
    },
    created_at:{ 
      type: Date, 
      required: true, 
      default: Date.now },
    token: {
      type:String,
      required:true
    }
  
});

//bcrpyt - password encryption
UserSchema.plugin(uniqueValidator);

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.virtual("password").set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 12);
});
 
const User = mongoose.model("User", UserSchema);

module.exports = User;