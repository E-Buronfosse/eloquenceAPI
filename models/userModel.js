const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    email: String,
    // password: String,
    // confirmePassword: String,
  },
  {
    timestamps: true, // ajoute 2 champs au document createdAt et updatedAt
  }
);

const userModel = mongoose.model("users", UserSchema);
module.exports.userModel = userModel;
