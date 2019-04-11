const User = require("../models/userModel");

module.exports = {
  attemptSignIn: async (email, password) => {
    const message = "Incorrect email or password. Please try again.";

    // find the user in the database with the provided email
    const user = await User.findOne({ email });

    // if we couldn't find the user or we did find it but the provided password is incorrect we throw an error
    if (!user || !(await user.matchesPassword(password))) {
      throw new Error(message);
    }

    // everything is ok return the found user
    return user;
  }
};
