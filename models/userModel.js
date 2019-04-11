const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");
const hash = require("bcryptjs").hash;
const compare = require("bcryptjs").compare;

const userSchema = new Schema({
  email: String,
  password: String
});

userSchema.pre("save", async function() {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
});

userSchema.statics.doesntExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

userSchema.methods.matchesPassword = function(password) {
  return compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

const testUser = new User({ email: "test@gmail.com", password: "hello" });
testUser.save();

module.exports = User;
