const db = require("../models");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    db.User
      .find(req.query)
      .sort({
        date: -1
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  checkUser: function (req, res) {
    db.User
      .findOne({
        email: req.body.email
      })
      .then(dbModel => {
        if (!dbModel) {
          db.User
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        } else if (dbModel && !dbModel.confirmed) {
          db.User
          .findOneAndUpdate({
            email: req.body.email
        }, {
            $set: {
                signUpMessage: "You have previosuly registered. New confirmation email has been sent"
            }},
            {
                new: true
            }
        )
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
       
        } else {
          db.User
          .findOneAndUpdate({
            email: req.body.email
        }, {
            $set: {
                signUpMessage: "You already have an account. Please log in"
            }},
            {
                new: true
            }
        )
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
        }
      })
  },
  confirm: function(req,res){
    db.User
    .findOneAndUpdate({
      _id: req.params.id
  }, {
      $set: {
          confirmed: true
      }},
      {
          new: true
      }
  )
  .then(dbUser => res.json(dbUser))
  .catch(err => res.status(422).json(err));
  },
  findByEmail: function (req, res) {
    db.User
      .findOne({
        email: req.params.email
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User
      .findById({
        _id: req.params.id
      })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  fetch: function (req, res) {
    res.json(req.user);
  },
  addToken:function(req,res){
    db.User
    .findOneAndUpdate({
      _id: req.params.id
  }, {
      $set: {
          token:req.params.token
      }},
      {
          new: true
      }
  )
  .then(dbUser => res.json(dbUser))
  .catch(err => res.status(422).json(err));
  },
  resetPass: function(req,req){
    db.User
    .findOneAndUpdate({
      _id: req.params.id
  }, {
      $set: {
          passworrdHash:bcrypt.hashSync(req.body.password,12)
      }},
      {
          new: true
      }
  )
  .then(dbUser => res.json(dbUser))
  .catch(err => res.status(422).json(err));
  },
}

