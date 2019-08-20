const db = require("../models");

module.exports = {
    addToCart: function (req, res) {
        db.User
            .findOneAndUpdate({
                _id: req.params.id
            }, {
                $push: {
                    cart: req.params.setname
                }},
                {
                    new: true
                }
            )
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
    },
    emptyCart:function (req, res) {
        db.User
            .findOneAndUpdate({
                _id: req.params.id
            }, {
                $set: {
                    cart: []
                }},
                {
                    new: true
                }
            )
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
    },
    removeOneFromCart:function(req,res){
        db.User
        .findOneAndUpdate({
          _id: req.params.id
        }, {
            $pull: {
                cart: req.params.setname
            }},
            {
                new: true
            },
        )
        // .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    addToPurchased:function(req,res){
        db.User
        .findOneAndUpdate({
            _id: req.params.id
        }, {
            $push: {
                purchased: req.params.setname
            }},
            {
                new: true
            }
        )
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
    },
    emptyPurchased:function (req, res) {
        db.User
            .findOneAndUpdate({
                _id: req.params.id
            }, {
                $set: {
                    purchased: []
                }},
                {
                    new: true
                }
            )
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
    },
    test: function (req, res) {
        res.json({
            "test": "yep this is a simple route"
        })
    }
}