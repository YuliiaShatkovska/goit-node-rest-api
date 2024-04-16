import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import path from "path";
// import gravatar from "gravatar";
// import Jimp from "jimp";
// import fs from "fs/promises";

import { User } from "../models/users.js";
import HttpError from "../helpers/HttpError.js";
import {
  userCheckSchema,
  // updateSubscriptionSchema,
  // emailValidateSchema,
} from "../schemas/usersSchemas.js";

dotenv.config();
const { SECRET_KEY } = process.env;

// const avatarDir = path.resolve("public", "avatars");

export const registerUser = async (req, res, next) => {
  try {
    const { error } = userCheckSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // const avatarURL = gravatar.url(email);

    // const verificationToken = nanoid();

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      // avatarURL,
      // verificationToken,
    });

    // const verifyEmail = {
    //   to: email,
    //   subject: "Verify email",
    //   html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify your email</a>`,
    // };

    // await sendEmail(verifyEmail);

    res.status(201).json({
      user: {
        email: newUser.email,
        // subscription: newUser.subscription,
        name: newUser.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

// export const verifyEmail = async (req, res, next) => {
//   try {
//     const { verificationToken } = req.params;
//     const user = await User.findOne({ verificationToken });

//     if (!user) {
//       throw HttpError(404, "User not found!");
//     }

//     await User.findByIdAndUpdate(user.id, {
//       verify: true,
//       verificationToken: null,
//     });

//     res.status(200).json({
//       message: "Verification successful!",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const resendVerification = async (req, res, next) => {
//   try {
//     const { error } = emailValidateSchema.validate(req.body);

//     if (error) {
//       throw HttpError(400, error.message);
//     }

//     const { email } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       throw HttpError(401, "User not found");
//     }

//     if (user.verify) {
//       throw HttpError(400, "Verification has already been passed");
//     }

//     const verifyEmail = {
//       to: email,
//       subject: "Verify email",
//       html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify your email</a>`,
//     };

//     res.status(200).json({
//       message: "Verification email sent",
//     });

//     await sendEmail(verifyEmail);
//   } catch (error) {
//     next(error);
//   }
// };

export const loginUser = async (req, res, next) => {
  try {
    const { error } = userCheckSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    // if (!user.verify) {
    //   throw HttpError(401, "Email not verified");
    // }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await User.findByIdAndUpdate(user.id, { token });

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrent = async (req, res, next) => {
  try {
    const { name, email } = req.user;

    res.json({
      name,
      email,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

// export const updateSubscription = async (req, res, next) => {
//   try {
//     const { error } = updateSubscriptionSchema.validate(req.body);

//     if (error) {
//       throw HttpError(400, error.message);
//     }

//     const { _id } = req.user;
//     const { subscription } = req.body;

//     await User.findByIdAndUpdate(_id, { subscription });

//     res.json({
//       message: "Your subscription has been update!",
//     });
//   } catch (error) {
//     next(error);
//   }
// };
// export const updateAvatar = async (req, res, next) => {
//   try {
//     const { _id } = req.user;

//     if (!req.file) {
//       throw HttpError(400, "Please, attach avatar.");
//     }

//     const { path: tempUpload, originalname } = req.file;

//     const fileName = `${_id}_${originalname}`;

//     const resultUpload = path.resolve(avatarDir, fileName);

//     const image = await Jimp.read(tempUpload);

//     image.resize(250, 250).write(tempUpload);

//     await fs.rename(tempUpload, resultUpload);

//     const avatarURL = path.join("avatars", fileName);

//     await User.findByIdAndUpdate(_id, { avatarURL });

//     res.json({
//       avatarURL,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
