import express from "express";

import {
  getCurrent,
  loginUser,
  logoutUser,
  registerUser,
  // resendVerification,
  // updateAvatar,
  // updateSubscription,
  // verifyEmail,
} from "../controllers/usersController.js";
import { checkToken } from "../middlewares/checkToken.js";
// import { upload } from "../middlewares/upload.js";

const usersRouter = express.Router();

usersRouter.post("/register", registerUser);

// usersRouter.get("/verify/:verificationToken", verifyEmail);

// usersRouter.post("/verify", resendVerification);

usersRouter.post("/login", loginUser);

usersRouter.post("/logout", checkToken, logoutUser);

usersRouter.get("/current", checkToken, getCurrent);

// usersRouter.patch("/", checkToken, updateSubscription);

// usersRouter.patch(
//   "/avatars",
//   checkToken,
//   upload.single("avatar"),
//   updateAvatar
// );

export default usersRouter;
