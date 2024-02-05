import express from "express";

import {
  getAllContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
  updateFavourite,
} from "../controllers/contactsControllers.js";
import { isValidId } from "../helpers/IsValidId.js";
import { checkToken } from "../middlewares/checkToken.js";

const contactsRouter = express.Router();

contactsRouter.get("/", checkToken, getAllContacts);

contactsRouter.get("/:id", checkToken, isValidId, getContactById);

contactsRouter.delete("/:id", checkToken, isValidId, deleteContact);

contactsRouter.post("/", checkToken, createContact);

contactsRouter.put("/:id", checkToken, isValidId, updateContact);

contactsRouter.patch("/:id/favourite", checkToken, isValidId, updateFavourite);

export default contactsRouter;
