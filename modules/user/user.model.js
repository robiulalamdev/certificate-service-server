const mongoose = require("mongoose");
const { userRoleEnum } = require("./user.constant");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: userRoleEnum,
      default: "User",
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      unique: true,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Object,
      code: {
        type: String,
        required: false,
      },
      number: {
        type: String,
        required: false,
      },
      required: false,
    },
    otp: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: false,
    },
    isPassword_reset: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
