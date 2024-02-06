import express from "express";

import {
  getCurrent,
  loginUser,
  logoutUser,
  registerUser,
  updateSubscription,
} from "../controllers/usersController.js";
import { checkToken } from "../middlewares/checkToken.js";

const usersRouter = express.Router();

usersRouter.post("/register", registerUser);

usersRouter.post("/login", loginUser);

usersRouter.post("/logout", checkToken, logoutUser);

usersRouter.get("/current", checkToken, getCurrent);

usersRouter.patch("/", checkToken, updateSubscription);

export default usersRouter;
