var express = require("express");
var router = express.Router();
const userController = require("../controller/userController");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // authenticate the user
  const user = await userController.attemptSignIn(email, password);

  // if no errors we have a user and we stick it's id into the cookie
  req.session.userId = user.id;
  res.send("auth ok");
});

router.get("/me", (req, res) => {
  // get the current userId if any

  res.send(req.session.userId);
});

module.exports = router;
