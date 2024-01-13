const User = require("./user.model");
const bcrcypt = require("bcryptjs");
const randomstring = require("randomstring");
const { generateToken, sendVerificationCode } = require("../../utils/auth");
const {
  sendForgotOTPMail,
  sendWelcomeMail,
} = require("../../utils/sendEmailHelpers");

const registerUser = async (req, res) => {
  try {
    const isExist = await User.findOne({ email: req.body.email });
    const isVerified = isExist?.isVerified;
    if (isExist && isVerified === true) {
      return res.status(403).send({
        success: false,
        type: "email",
        message: `${req.body.email} is already Exist!`,
        status: 403,
      });
    } else if (isExist && isVerified === false) {
      const password = bcrcypt.hashSync(req.body.password);
      const otp = randomstring.generate({ length: 5, charset: "numeric" });

      isExist.password = password;
      isExist.otp = otp;

      const updatedUser = await isExist.save();
      await sendVerificationCode(updatedUser, otp);

      res.status(200).send({
        success: true,
        type: "verification",
        message: "We have sent you verification code. Please check your email!",
        status: 200,
      });
    } else {
      const otp = randomstring.generate({ length: 5, charset: "numeric" });
      const newUser = new User({
        role: req.body.role,
        full_name: req.body.full_name,
        email: req.body.email,
        password: bcrcypt.hashSync(req.body.password),
        otp,
      });
      const user = await newUser.save();
      await sendVerificationCode(user, otp);
      res.status(200).send({
        success: true,
        type: "verification",
        message: "We have sent you verification code. Please check your email!",
        status: 200,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// get user info by token verified => email
const getUserInfo = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req?.user?._id });
    if (user) {
      user["password"] = "";
      res.send(user);
    } else {
      res.send("User Not Found");
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const emailVerification = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        message: "User not found!",
        status: 200,
      });
    }

    if (user?.otp !== otp) {
      return res.status(400).send({
        success: false,
        message: "Invalid OTP",
        status: 200,
      });
    } else {
      user.isVerified = true;
      await user.save();
      const result = await sendWelcomeMail(user);
      const token = await generateToken(user);
      if (result) {
        res.send({
          message: "User Verified successfully",
          user,
          accessToken: token,
          status: 200,
        });
      } else {
        res.send({
          success: false,
          message: "Something went wrong",
          status: 200,
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({
        success: false,
        type: "email",
        message: "User not found",
      });
    }

    if (user?.isVerified === false) {
      return res.status(401).send({
        success: false,
        type: "email",
        message: "Email is not Verified",
      });
    }
    if (
      user &&
      bcrcypt.compareSync(req.body.password, user.password) &&
      user?.isVerified === true
    ) {
      const accessToken = await generateToken(user);
      return res.send({
        success: true,
        message: "Logged in successfully",
        status: 200,
        user,
        accessToken,
      });
    } else {
      res.status(401).send({
        success: false,
        type: "password",
        message: "Invalid user or password",
        status: 401,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      data: users,
      status: 200,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id })
      .exec()
      .then((result) => {
        res.status(200).send({
          message: `${result?.full_name} is successfully removed!`,
          status: 200,
        });
      })
      .catch((err) => {
        res.send({
          message: err.message,
        });
      });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, {
      full_name: 1,
      email: 1,
      isVerified: 1,
    });
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const isExist = await User.findOne({ email: req.body.email });
    if (req.body.email && !req.body.otp && !req.body.password) {
      if (isExist && isExist.isVerified === true) {
        const otp = randomstring.generate({ length: 5, charset: "numeric" });
        isExist.otp = otp;
        const updatedUser = await isExist.save();
        const data = await sendForgotOTPMail(updatedUser, otp);
        res.status(200).send({
          message:
            "We have sent you verification code. Please check your email!",
          status: true,
        });
      } else if (isExist) {
        res.status(200).send({
          message: "Account Not Found",
          status: false,
        });
      } else {
        res.status(200).send({
          message: "Email Not Verified",
          status: false,
        });
      }
    } else if (req.body.email && req.body.otp && !req.body.password) {
      if (isExist.otp === req.body.otp) {
        res.send({
          message: "Change Your Password",
          status: true,
        });
      } else {
        res.send({
          message: "OTP is incorrect",
          status: false,
        });
      }
    } else if (req.body.email && req.body.password) {
      const newPassword = bcrcypt.hashSync(req.body.password);
      const result = await User.findByIdAndUpdate(
        { _id: isExist?._id },
        { password: newPassword },
        {
          new: true,
        }
      );
      res.send({
        message: "Password Changed successfully",
        data: result,
        success: true,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  const { old_password, new_password } = req.body;
  try {
    const user = await User.findById({ _id: req.user._id });

    if (!user) {
      res.status(404).json({ message: "User not found." });
    }
    const isPasswordMatch = await bcrcypt.compareSync(
      old_password,
      user.password
    );
    if (!isPasswordMatch) {
      res.status(401).json({
        success: false,
        message: "Incorrect old password.",
      });
    } else {
      user.password = bcrcypt.hashSync(new_password);
      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const checkIsExistEmail = async (req, res) => {
  try {
    const isExist = await User.findOne({ email: req.body.email });
    if (isExist) {
      res.status(201).json({
        success: false,
        message: "Email Already in use",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Email is Unique",
      });
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const { password, otp, ...other } = req.body;
    const isExist = await User.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await User.findByIdAndUpdate(
        { _id: req.params.id },
        other,
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "User Info Update successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: false,
        message: "Update unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: error.message,
    });
  }
};

const userImageUpdate = async (req, res) => {
  try {
    const isExist = await User.findOne({ _id: req.user?._id });
    if (isExist) {
      const result = await User.findByIdAndUpdate(
        { _id: req.user?._id },
        { image: req.file.path },
        {
          new: true,
        }
      );
      res.status(200).json({
        success: true,
        message: "User Info Update successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        success: false,
        message: "Update unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  emailVerification,
  getUser,
  getUserInfo,
  forgetPassword,
  changePassword,
  checkIsExistEmail,
  updateUserInfo,
  userImageUpdate,
};
