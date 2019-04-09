var express = require("express");
var router = express.Router();
var User = require("../models/user");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", req, res => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(user => {
      req.session.user = user.dataValues;
      res.statusCode(200);
    })
    .catch(error => res.send(error));
});

module.exports = router;
