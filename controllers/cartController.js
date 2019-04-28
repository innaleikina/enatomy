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

    test: function (req, res) {
        res.json({
            "test": "yep this is a simple route"
        })
    }
}