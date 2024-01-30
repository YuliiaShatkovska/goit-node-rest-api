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

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getContactById);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post("/", createContact);

contactsRouter.put("/:id", isValidId, updateContact);

contactsRouter.patch("/:id/favourite", isValidId, updateFavourite);

export default contactsRouter;
